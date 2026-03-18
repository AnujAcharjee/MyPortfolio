'use client';

import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { useRef } from 'react';
import { ContactForm } from '@/components/body/ContactMe/ContactForm';

interface ContactMeModalProps {
  isActive: boolean;
  onClose: () => void;
}

interface ContactMeModalProps {
  isActive: boolean;
  // id: string;
  onClose: () => void;
}

export function ContactMeModal({ isActive, onClose }: ContactMeModalProps) {
  const ref = useRef<HTMLDivElement>(null!);
  useOutsideClick(ref, onClose);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isActive && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-999"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 grid place-items-center z-1000 p-4"
          >
            <div
              ref={ref}
              className="w-full max-w-140 h-fit max-h-[92dvh] overflow-y-auto flex flex-col rounded-2xl border border-white/10 bg-[#0d1117]"
            >
              <ContactForm onClose={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
