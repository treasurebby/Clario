import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/atoms/Card';
import { Button } from '../components/atoms/Button';
import { Badge } from '../components/atoms/Badge';
import { useAssessment } from '../context/AssessmentContext';
import { Target, CheckCircle, TrendingUp, Home, RotateCcw } from 'lucide-react';

export const Results: React.FC = () => {
  const navigate = useNavigate();
  const { userName, stream, recommendations, resetAssessment } = useAssessment();
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    if (!userName || !stream || recommendations.length === 0) {
      navigate('/dashboard');
    }
  }, [userName, stream, recommendations, navigate]);

  useEffect(() => {
    if (recommendations.length > 0) {
      const targetPercentage = recommendations[0].matchPercentage;
      let current = 0;
      const increment = targetPercentage / 50;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetPercentage) {
          setAnimatedPercentage(targetPercentage);
          clearInterval(timer);
        } else {
          setAnimatedPercentage(Math.floor(current));
        }
      }, 40);

      return () => clearInterval(timer);
    }
  }, [recommendations]);

  const handleRetake = () => {
    resetAssessment();
    navigate('/dashboard');
  };

  if (recommendations.length === 0) {
    return null;
  }

  const primary = recommendations[0];
  const alternatives = recommendations.slice(1, 4);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Celebration Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="text-6xl mb-4"
          >
            🎯
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Your Career Recommendations
          </h1>
          <p className="text-text-secondary text-lg">
            Based on your assessment, {userName}
          </p>
        </motion.div>

        {/* Primary Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card className="p-8 md:p-12 border-2 border-purple-primary shadow-glow-purple-lg">
            <div className="text-center mb-8">
              <Badge variant="success" className="mb-4 text-base">
                <Target className="w-4 h-4" />
                Top Match
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {primary.course.name}
              </h2>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="text-6xl md:text-7xl font-bold text-gradient mb-4"
              >
                {animatedPercentage}%
              </motion.div>

              <p className="text-purple-light text-xl font-semibold mb-6">Match Percentage</p>

              <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
                {primary.course.description}
              </p>
            </div>

            {/* Key Reasons */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                Why This Course Fits You
              </h3>
              <div className="space-y-3">
                {primary.reasons.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-3 text-text-secondary"
                  >
                    <span className="text-green-400 text-xl">✓</span>
                    <span>{reason}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* JAMB Subjects */}
            <div className="bg-surface-hover rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-3">Required JAMB Subjects:</h3>
              <div className="flex flex-wrap gap-2">
                {primary.course.jambSubjects.map((subject, index) => (
                  <Badge key={index} variant="primary">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Alternative Recommendations */}
        {alternatives.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              Other Great Options
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {alternatives.map((rec, index) => (
                <motion.div
                  key={rec.course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <Card hoverable className="h-full flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {rec.course.name}
                    </h3>

                    <div className="text-3xl font-bold text-purple-light mb-3">
                      {rec.matchPercentage}%
                    </div>

                    <p className="text-text-secondary text-sm mb-4 flex-1">
                      {rec.course.description}
                    </p>

                    <div className="space-y-2">
                      {rec.reasons.slice(0, 2).map((reason, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="text-purple-accent">→</span>
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mb-12"
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-light" />
              Next Steps
            </h2>
            <div className="space-y-3 text-text-secondary">
              <p className="flex items-start gap-3">
                <span>→</span>
                <span>Check JAMB requirements for {primary.course.name}</span>
              </p>
              <p className="flex items-start gap-3">
                <span>→</span>
                <span>Research universities offering this course</span>
              </p>
              <p className="flex items-start gap-3">
                <span>→</span>
                <span>Talk to people studying {primary.course.name}</span>
              </p>
              <p className="flex items-start gap-3">
                <span>→</span>
                <span>Consider internship or volunteer opportunities in this field</span>
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <Home className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>

          <Button variant="secondary" onClick={handleRetake}>
            <RotateCcw className="w-5 h-5 mr-2" />
            Retake Assessment
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
