import type { Stream } from './user.types';

export interface QuestionOption {
  id: string;
  label: string;
  text: string;
  value: number;
  traits: string[];
}

export type QuestionType = 'multiple-choice' | 'scale';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  stream: Stream;
  options: QuestionOption[];
  category: string;
}

export interface Answer {
  questionId: string;
  selectedOption: QuestionOption;
  timestamp: Date;
}

export interface AssessmentProgress {
  currentQuestion: number;
  totalQuestions: number;
  answers: Answer[];
  isComplete: boolean;
}

export interface AssessmentState extends AssessmentProgress {
  answerQuestion: (questionId: string, option: QuestionOption) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitAssessment: () => void;
  resetAssessment: () => void;
}
