'use client';

import { useState } from 'react';
import { ContactMeModal } from '@/components/body/ContactMe/ContactMeModal';

export default function ConnectText() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <p className="text-sm font-mono text-white/40 tracking-wide mt-1 text-center select-none">
        drop a message... let&apos;s{' '}
        <button
          onClick={() => setIsActive(true)}
          className="font-mono underline decoration-white/40 hover:decoration-white hover:text-white/80 cursor-pointer transition-colors duration-200"
        >
          connect
        </button>{' '}
        🤝
      </p>
      <ContactMeModal isActive={isActive} onClose={() => setIsActive(false)} />
    </>
  );
}
