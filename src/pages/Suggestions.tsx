import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/atoms/Card';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';

export const Suggestions: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    message: '',
    email: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    'Feature Request',
    'Bug Report',
    'Course Suggestion',
    'General Feedback',
    'Other',
  ];

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit suggestion');
      }

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ category: '', message: '', email: '' });
        setIsSubmitted(false);
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      setErrors({ message: 'Unable to send right now. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-text-secondary text-lg">
            Your suggestion has been received. We appreciate your feedback!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            We'd Love to Hear From You 💬
          </h1>
          <p className="text-text-secondary text-lg">
            Your feedback helps us improve Clario for everyone
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Category <span className="text-purple-primary">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, category });
                        setErrors({ ...errors, category: '' });
                      }}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        formData.category === category
                          ? 'border-purple-primary bg-purple-primary/20 text-purple-light'
                          : 'border-surface-hover text-text-secondary hover:border-purple-primary/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-2">{errors.category}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Your Message <span className="text-purple-primary">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    setErrors({ ...errors, message: '' });
                  }}
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  className={`w-full bg-surface text-text-primary border-2 rounded-lg px-4 py-3 transition-all focus:outline-none ${
                    errors.message
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-surface-hover focus:border-purple-primary focus:shadow-glow-purple'
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-2">{errors.message}</p>
                )}
              </div>

              {/* Email (Optional) */}
              <Input
                label="Email (Optional)"
                value={formData.email}
                onChange={(value) => {
                  setFormData({ ...formData, email: value });
                  setErrors({ ...errors, email: '' });
                }}
                error={errors.email}
                placeholder="your.email@example.com"
                type="email"
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Suggestion
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
