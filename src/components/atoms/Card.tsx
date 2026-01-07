import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  selected = false,
  onClick,
  className = '',
}) => {
  const baseStyles = 'bg-surface rounded-xl p-6 border border-white/5 shadow-sm transition-all duration-300';
  const hoverStyles = hoverable
    ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:border-[var(--color-brand)]/25'
    : '';
  const selectedStyles = selected
    ? 'border-[var(--color-brand)]/60 shadow-[0_14px_40px_rgba(107,99,255,0.25)]'
    : '';

  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverable ? { y: -6 } : {}}
      className={`${baseStyles} ${hoverStyles} ${selectedStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
};
