import React from 'react';
import { motion } from 'framer-motion';

export interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className = '' }) => {
  const percentage = (current / total) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-text-secondary text-sm font-medium">
          Question {current} of {total}
        </span>
        <span className="text-purple-light text-sm font-semibold">{Math.round(percentage)}%</span>
      </div>

      <div className="w-full h-3 bg-surface-hover rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-purple-600 to-purple-primary rounded-full"
        />
      </div>
    </div>
  );
};
