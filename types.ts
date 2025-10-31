
export enum Tool {
  DoubtSolver,
  QuizGenerator,
  CurrentAffairs,
}

export type PolicyPageType = 'privacy' | 'terms' | 'support' | 'about' | 'contact' | 'disclaimer';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface CurrentAffairsData {
  content: string;
  sources: GroundingSource[];
}