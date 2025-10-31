
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, CurrentAffairsData, GroundingSource } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const solveDoubt = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert tutor for competitive exams. Explain the concept clearly, concisely, and accurately. Use markdown for formatting like headings, lists, and bold text.',
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error in solveDoubt:", error);
    return "Sorry, I encountered an error while trying to solve your doubt. Please try again.";
  }
};

export const generateQuiz = async (topic: string, numQuestions: number): Promise<QuizQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a quiz with ${numQuestions} multiple-choice questions on the topic: "${topic}". Each question should have 4 options. Ensure the provided correctAnswer exactly matches one of the options.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: 'The quiz question.'
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'An array of 4 possible answers.'
               },
              correctAnswer: {
                type: Type.STRING,
                description: 'The correct answer, which must be one of the strings from the options array.'
              }
            },
            required: ['question', 'options', 'correctAnswer']
          }
        }
      }
    });
    const quizData = JSON.parse(response.text);
    return quizData as QuizQuestion[];
  } catch (error) {
    console.error("Error in generateQuiz:", error);
    throw new Error("Failed to generate the quiz. The topic might be too broad or unsupported. Please try again with a more specific topic.");
  }
};

export const getCurrentAffairs = async (): Promise<CurrentAffairsData> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Summarize the top 5 most important global and national (India) current affairs from the last 24 hours. Provide a brief, well-structured summary for each point using markdown.",
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const content = response.text;
    const rawSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    
    const sources: GroundingSource[] = rawSources
      .map((chunk: any) => ({
        uri: chunk.web?.uri || '',
        title: chunk.web?.title || 'Untitled Source',
      }))
      .filter((s: GroundingSource) => s.uri);

    return { content, sources };
  } catch (error) {
    console.error("Error in getCurrentAffairs:", error);
    throw new Error("Failed to fetch current affairs. Please check your connection and try again.");
  }
};
