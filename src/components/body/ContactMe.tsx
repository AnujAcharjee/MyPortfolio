'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { CONTACT_WORDS } from '@/constants/typewriterWords';

type Status = 'idle' | 'sending' | 'success' | 'error';

const STATUS_CONFIG: Record<Status, { label: string; icon: React.ReactNode; color: string } | null> = {
  idle: null,
  sending: {
    label: 'Sending...',
    icon: <Loader2 size={13} className="animate-spin" />,
    color: 'text-white/40',
  },
  success: { label: 'Message sent!', icon: <CheckCircle size={13} />, color: 'text-emerald-400' },
  error: { label: 'Failed to send. Try again.', icon: <XCircle size={13} />, color: 'text-red-400/80' },
};

export default function ContactMe() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setCompany('');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const feedback = STATUS_CONFIG[status];

  return (
    <div id="contact" className="w-full flex flex-col items-start gap-4 px-2 sm:py-10">
      {/* Header — unchanged */}
      <TypewriterEffect words={CONTACT_WORDS} cursorClassName="!h-3 !w-0.5 sm:!h-4" />

      <HoverBorderGradient
        containerClassName="w-full rounded-2xl bg-card"
        as="div"
        className="w-full rounded-2xl overflow-hidden bg-card"
      >
        {/* Top bar */}
        <div className="flex items-center gap-1.5 px-4 sm:px-5 py-3">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>

        <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-7 px-6 py-8">
          {/* Honeypot */}
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="hidden"
            tabIndex={-1}
          />

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField label="Name" htmlFor="name">
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={fieldCls}
              />
            </FormField>

            <FormField label="Email" htmlFor="email">
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={fieldCls}
              />
            </FormField>
          </div>

          {/* Message */}
          <FormField label="Message" htmlFor="message">
            <textarea
              id="message"
              placeholder="What's on your mind..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              className={cn(fieldCls, 'resize-none leading-relaxed')}
            />
          </FormField>

          {/* Divider */}
          <div className="h-px bg-white/6" />

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <AnimatePresence mode="wait">
              {feedback ?
                <motion.span
                  key={status}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={cn('flex items-center gap-1.5 text-xs font-mono', feedback.color)}
                >
                  {feedback.icon}
                  {feedback.label}
                </motion.span>
              : <span className="text-xs font-mono text-white/15">I&apos;ll reply you back.</span>}
            </AnimatePresence>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-xs font-mono font-semibold rounded-md bg-sky-500/15 hover:bg-sky-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-sky-400 border border-sky-500/25 transition-all"
            >
              {status === 'sending' ?
                <Loader2 size={13} className="animate-spin" />
              : <Send size={13} />}
              Send Message
            </button>
          </div>
        </form>
      </HoverBorderGradient>
    </div>
  );
}

// shared field styles
const fieldCls =
  'w-full rounded-md px-3 py-2.5 text-sm text-white/80 ' +
  'bg-[#0d1117] border border-white/[0.08] ' +
  'placeholder:text-white/20 ' +
  // 'focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/40 ' +
  'transition-all duration-200';

function FormField({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      <Label htmlFor={htmlFor} className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
        {label}
      </Label>
      {children}
    </div>
  );
}
