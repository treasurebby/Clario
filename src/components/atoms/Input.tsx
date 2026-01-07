import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  type = 'text',
  className = '',
  size = 'md',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const sizeStyles = {
    sm: 'px-3 py-3 pt-5 text-base',
    md: 'px-4 py-4 pt-6 text-base',
    lg: 'px-5 py-5 pt-7 text-lg',
  };

  return (
    <div className={`relative ${className}`}>
      <motion.label
        initial={false}
        animate={{
          top: isFocused || value ? '0.5rem' : '50%',
          translateY: isFocused || value ? '0' : '-50%',
          fontSize: isFocused || value ? '0.75rem' : '1rem',
          color: isFocused ? '#a78bfa' : '#9ca3af',
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 pointer-events-none font-medium"
      >
        {label} {required && '*'}
      </motion.label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? placeholder : ''}
        className={`w-full bg-surface text-text-primary border-2 rounded-lg transition-all duration-300 focus:outline-none ${
          sizeStyles[size]
        } ${
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-surface-hover focus:border-purple-primary focus:shadow-glow-purple'
        }`}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
