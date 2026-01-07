import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Stream } from '../types/user.types';
import type { Answer, Question, QuestionOption } from '../types/assessment.types';
import type { CourseRecommendation } from '../types/course.types';
import { AssessmentService } from '../services/AssessmentService';
import { LocalStorageService } from '../services/StorageService';
import { RecommendationService } from '../services/RecommendationService';

// Create service instances
const storageService = new LocalStorageService();
const recommendationService = new RecommendationService();
const assessmentService = new AssessmentService(storageService, recommendationService);

interface AssessmentContextType {
  // User state
  userName: string;
  setUserName: (name: string) => void;
  stream: Stream | null;
  selectStream: (stream: Stream) => void;

  // Assessment state
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  isAssessmentComplete: boolean;

  // Assessment actions
  answerQuestion: (questionId: string, option: QuestionOption) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitAssessment: () => void;
  resetAssessment: () => void;

  // Results
  recommendations: CourseRecommendation[];
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserNameState] = useState<string>(() => {
    return storageService.load<string>('clario_user_name') || '';
  });

  const [stream, setStreamState] = useState<Stream | null>(() => {
    return storageService.load<Stream>('clario_user_stream') || null;
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);

  const setUserName = (name: string) => {
    setUserNameState(name);
    storageService.save('clario_user_name', name);
  };

  const selectStream = (selectedStream: Stream) => {
    setStreamState(selectedStream);
    storageService.save('clario_user_stream', selectedStream);

    const streamQuestions = assessmentService.getQuestionsByStream(selectedStream);
    setQuestions(streamQuestions);

    const savedAnswers = assessmentService.getAnswers();
    setAnswers(savedAnswers);
  };

  const answerQuestion = (questionId: string, option: QuestionOption) => {
    assessmentService.saveAnswer(questionId, option);

    const updatedAnswers = assessmentService.getAnswers();
    setAnswers(updatedAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitAssessment = () => {
    if (!stream) return;

    const results = assessmentService.calculateResults(stream);
    setRecommendations(results);
    setIsAssessmentComplete(true);
    storageService.save('clario_assessment_complete', true);
    storageService.save('clario_recommendations', results);
  };

  const resetAssessment = () => {
    assessmentService.clearAssessment();
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setIsAssessmentComplete(false);
    setRecommendations([]);
    storageService.clear('clario_assessment_complete');
    storageService.clear('clario_recommendations');
  };

  return (
    <AssessmentContext.Provider
      value={{
        userName,
        setUserName,
        stream,
        selectStream,
        questions,
        currentQuestionIndex,
        answers,
        isAssessmentComplete,
        answerQuestion,
        nextQuestion,
        previousQuestion,
        submitAssessment,
        resetAssessment,
        recommendations,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = (): AssessmentContextType => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
