import React from 'react';
import { Card } from '../atoms/Card';
import { Target, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export interface FeatureCardProps {
  icon: 'target' | 'trending-up' | 'sparkles';
  title: string;
  description: string;
}

const iconMap = {
  target: Target,
  'trending-up': TrendingUp,
  sparkles: Sparkles,
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const Icon = iconMap[icon];

  return (
    <Card hoverable className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-purple-primary rounded-full flex items-center justify-center shadow-glow-purple"
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>

      <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </Card>
  );
};
