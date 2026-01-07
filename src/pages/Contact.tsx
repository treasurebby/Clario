import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import { Mail, ArrowLeft } from 'lucide-react';

const TO_EMAIL = 'ehiomhentreasureruth@gmail.com';

export const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email.trim() || !message.trim()) {
      setError('Email and message are required');
      return;
    }

    const subject = encodeURIComponent(`Contact from ${name || 'Clario visitor'}`);
    const body = encodeURIComponent(`Name: ${name || 'N/A'}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(107,99,255,0.08),transparent_35%),radial-gradient(circle_at_82%_12%,rgba(84,75,255,0.12),transparent_42%)]" aria-hidden />

      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-16 pb-16 space-y-10">
        <div className="flex items-center gap-3 text-text-secondary text-sm">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="px-3">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand)]/40 bg-[var(--color-brand)]/10 px-4 py-2 text-[var(--color-brand)]">
            <Mail className="w-4 h-4" />
            <span className="font-semibold">Contact Me</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">I’d love to hear from you</h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Drop a quick message and it will open your mail client addressed to me. I usually reply within a day.
          </p>
        </motion.div>

        <div className="space-y-4">
          <Input
            label="Your name"
            value={name}
            onChange={(val) => {
              setName(val);
              setError('');
            }}
            placeholder="Enter your name"
            size="sm"
          />

          <Input
            label="Your email *"
            value={email}
            onChange={(val) => {
              setEmail(val);
              setError('');
            }}
            placeholder="you@example.com"
            required
            size="sm"
          />

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">Message *</label>
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError('');
              }}
              className="w-full bg-surface text-text-primary border-2 border-surface-hover rounded-lg px-4 py-4 min-h-[160px] transition-all duration-300 focus:outline-none focus:border-purple-primary focus:shadow-glow-purple"
              placeholder="How can I help?"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => navigate(-1)} size="md">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} size="md">
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
