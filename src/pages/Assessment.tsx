import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/atoms/Button';
import { ProgressBar } from '../components/molecules/ProgressBar';
import { QuestionCard } from '../components/molecules/QuestionCard';
import { useAssessment } from '../context/AssessmentContext';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import type { QuestionOption } from '../types/assessment.types';

export const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const {
    userName,
    stream,
    questions,
    currentQuestionIndex,
    answers,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    submitAssessment,
  } = useAssessment();

  const [selectedOption, setSelectedOption] = useState<QuestionOption | undefined>(undefined);

  useEffect(() => {
    if (!userName || !stream) {
      navigate('/dashboard');
    }
  }, [userName, stream, navigate]);

  useEffect(() => {
    const currentAnswer = answers.find(
      (a) => a.questionId === questions[currentQuestionIndex]?.id
    );
    setSelectedOption(currentAnswer?.selectedOption);
  }, [currentQuestionIndex, answers, questions]);

  const handleAnswerSelection = (option: QuestionOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    answerQuestion(currentQuestion.id, option);
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) {
      alert('Please select an answer before proceeding');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      submitAssessment();
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text-secondary text-xl">Loading assessment...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
        </motion.div>

        {/* Question Card */}
        <div className="mb-8">
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswerSelection}
            selectedOption={selectedOption}
          />
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center gap-4"
        >
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex-1 md:flex-none"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          <div className="hidden md:block text-text-muted text-sm">
            {selectedOption ? 'Answer selected ✓' : 'Select an answer to continue'}
          </div>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!selectedOption}
            className="flex-1 md:flex-none"
          >
            {isLastQuestion ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Submit
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </motion.div>

        {/* Mobile status text */}
        <div className="md:hidden text-center mt-4 text-text-muted text-sm">
          {selectedOption ? 'Answer selected ✓' : 'Select an answer to continue'}
        </div>
      </div>
    </div>
  );
};
