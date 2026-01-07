import type { Question, Answer, QuestionOption } from '../types/assessment.types';
import type { CourseRecommendation } from '../types/course.types';
import type { Stream } from '../types/user.types';
import { QUESTIONS } from '../utils/constants';
import type { IStorageService } from './StorageService';
import type { IRecommendationService } from './RecommendationService';

export interface IAssessmentService {
  getQuestionsByStream(stream: Stream): Question[];
  saveAnswer(questionId: string, option: QuestionOption): void;
  getAnswers(): Answer[];
  calculateResults(stream: Stream): CourseRecommendation[];
  clearAssessment(): void;
}

export class AssessmentService implements IAssessmentService {
  private readonly STORAGE_KEY = 'clario_assessment_answers';
  private storageService: IStorageService;
  private recommendationService: IRecommendationService;

  constructor(
    storageService: IStorageService,
    recommendationService: IRecommendationService
  ) {
    this.storageService = storageService;
    this.recommendationService = recommendationService;
  }

  getQuestionsByStream(stream: Stream): Question[] {
    return QUESTIONS[stream] || [];
  }

  saveAnswer(questionId: string, option: QuestionOption): void {
    const answers = this.getAnswers();
    const existingIndex = answers.findIndex((a) => a.questionId === questionId);

    const newAnswer: Answer = {
      questionId,
      selectedOption: option,
      timestamp: new Date(),
    };

    if (existingIndex >= 0) {
      answers[existingIndex] = newAnswer;
    } else {
      answers.push(newAnswer);
    }

    this.storageService.save(this.STORAGE_KEY, answers);
  }

  getAnswers(): Answer[] {
    return this.storageService.load<Answer[]>(this.STORAGE_KEY) || [];
  }

  calculateResults(stream: Stream): CourseRecommendation[] {
    const answers = this.getAnswers();
    return this.recommendationService.getRankedRecommendations(answers, stream);
  }

  clearAssessment(): void {
    this.storageService.clear(this.STORAGE_KEY);
  }
}
