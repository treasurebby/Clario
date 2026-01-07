import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import type { Question, QuestionOption } from '../../types/assessment.types';

export interface QuestionCardProps {
  question: Question;
  onAnswer: (option: QuestionOption) => void;
  selectedOption?: QuestionOption;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  selectedOption,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-8 leading-relaxed">
            {question.text}
          </h2>

          <div className="space-y-4">
            {question.options.map((option) => (
              <Button
                key={option.id}
                variant={selectedOption?.id === option.id ? 'primary' : 'outline'}
                onClick={() => onAnswer(option)}
                className="w-full justify-start text-left"
              >
                <span className="font-bold mr-3">{option.label}.</span>
                <span>{option.text}</span>
              </Button>
            ))}
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
