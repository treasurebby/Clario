import type { Stream } from './user.types';

export interface Course {
  id: string;
  name: string;
  stream: Stream;
  description: string;
  traits: string[];
  jambSubjects: string[];
  careerPaths: string[];
  icon: string;
}

export interface CourseRecommendation {
  course: Course;
  matchPercentage: number;
  reasons: string[];
  keyTraits: string[];
}

export interface RecommendationResult {
  primary: CourseRecommendation;
  alternatives: CourseRecommendation[];
  userName: string;
  stream: Stream;
  completedAt: Date;
}
