import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/atoms/Button';
import { StreamSelector } from '../components/molecules/StreamSelector';
import { FeatureCard } from '../components/molecules/FeatureCard';
import { useAssessment } from '../context/AssessmentContext';
import { FEATURES } from '../utils/constants';
import { MessageSquare, ArrowRight, GraduationCap, Mail } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { userName, stream, selectStream } = useAssessment();

  useEffect(() => {
    if (!userName) {
      navigate('/');
    }
  }, [userName, navigate]);

  const handleStartAssessment = () => {
    if (stream) {
      navigate('/assessment');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(107,99,255,0.12),transparent_35%),radial-gradient(circle_at_82%_8%,rgba(84,75,255,0.14),transparent_42%)]" aria-hidden />

      {/* Top-right brand */}
      <div className="absolute top-0 inset-x-0 flex justify-end px-6 py-5 z-20">
        <div className="flex items-center gap-2 text-lg font-semibold text-[var(--color-brand)] hover:underline underline-offset-4 decoration-[var(--color-brand)]/60 transition-colors">
          <GraduationCap className="w-5 h-5" />
          <span>Clario</span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome, {userName}! 👋
          </h1>
          <p className="text-text-secondary text-xl">
            Let's discover your perfect career path
          </p>
        </motion.div>

        {/* Stream Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Select Your Stream
          </h2>
          <p className="text-text-secondary text-sm text-center mb-6">Pick one to continue</p>
          <StreamSelector selectedStream={stream} onSelectStream={selectStream} />

          {stream && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 text-center"
            >
              <Button
                variant="primary"
                size="md"
                onClick={handleStartAssessment}
                className="shadow-[0_12px_30px_rgba(107,99,255,0.3)] px-8"
              >
                Start Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Why Choose Clario?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <FeatureCard
                  icon={feature.icon as any}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Suggestion CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-4"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/suggestions')}
            className="group w-full md:w-auto px-4"
          >
            <MessageSquare className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            Make a Suggestion
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 w-full md:w-auto px-4"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
