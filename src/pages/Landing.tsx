import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import { useAssessment } from '../context/AssessmentContext';
import { GraduationCap, Sparkles } from 'lucide-react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { setUserName } = useAssessment();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (name.trim().length < 2) {
      setError('Please enter at least 2 characters');
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      setError('Name should only contain letters and spaces');
      return;
    }

    setUserName(name.trim());
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Top-right brand */}
      <div className="absolute top-0 inset-x-0 flex justify-end px-6 py-5 z-20">
        <div className="flex items-center gap-2 text-xl font-semibold text-[var(--color-brand)]">
          <GraduationCap className="w-6 h-6" />
          <span>Clario</span>
        </div>
      </div>

      {/* Clean hero background */}
      <div className="absolute inset-0 bg-black" />

      {/* Content */}
      <div className="relative z-10 flex items-start justify-center min-h-screen px-6 pt-14 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full text-center"
        >
          {/* Badge top-center */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-10 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand)]/40 bg-[var(--color-brand)]/10 px-6 py-3 text-[var(--color-brand)] shadow-[var(--color-brand-glow)]">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold">Your Future Starts Here</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          >
            <span className="text-white">Discover Your Perfect</span>
            <br />
            <span className="text-white">Career Path</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-text-secondary text-lg md:text-xl mb-12 leading-relaxed max-w-xl mx-auto"
          >
            Take our intelligent career assessment and get personalised recommendations tailored to
            your interests, skills, and ambitions.
          </motion.p>

          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-md mx-auto space-y-6"
          >
            <Input
              label="What's your name?"
              value={name}
              onChange={(value) => {
                setName(value);
                setError('');
              }}
              error={error}
              placeholder="Enter your full name"
              required
              size="sm"
            />

            <Button
              variant="primary"
              size="md"
              onClick={handleSubmit}
              className="w-full"
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Get Started</span>
              </span>
            </Button>
          </motion.div>

          {/* Footer text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-text-muted text-sm mt-8"
          >
            Takes only 5 minutes • No registration required • Instant results
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};
