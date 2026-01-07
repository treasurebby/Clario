import React from 'react';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import type { Stream } from '../../types/user.types';
import { FlaskConical, BookOpen, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export interface StreamSelectorProps {
  selectedStream: Stream | null;
  onSelectStream: (stream: Stream) => void;
}

const streamData = [
  {
    id: 'Science' as Stream,
    name: 'Science',
    icon: FlaskConical,
    description: 'For students interested in mathematics, physics, chemistry, biology, and technology.',
  },
  {
    id: 'Arts' as Stream,
    name: 'Arts',
    icon: BookOpen,
    description: 'For students passionate about humanities, languages, social sciences, and creative expression.',
  },
  {
    id: 'Commercial' as Stream,
    name: 'Commercial',
    icon: TrendingUp,
    description: 'For students drawn to business, finance, economics, and entrepreneurship.',
  },
];

export const StreamSelector: React.FC<StreamSelectorProps> = ({ selectedStream, onSelectStream }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {streamData.map((stream, index) => {
        const Icon = stream.icon;
        const isSelected = selectedStream === stream.id;

        return (
          <motion.div
            key={stream.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              hoverable
              selected={isSelected}
              onClick={() => onSelectStream(stream.id)}
              className="h-full flex flex-col justify-between gap-4"
            >
              <div className="flex-1 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-strong)] rounded-full flex items-center justify-center shadow-[0_12px_30px_rgba(107,99,255,0.25)]">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-text-primary tracking-tight">
                  {stream.name}
                </h3>

                <p className="text-text-secondary leading-relaxed max-w-xs">
                  {stream.description}
                </p>
              </div>

              <Button
                variant={isSelected ? 'primary' : 'secondary'}
                size="md"
                className="w-full"
                onClick={() => onSelectStream(stream.id)}
              >
                {isSelected ? 'Selected' : 'Select'}
              </Button>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
