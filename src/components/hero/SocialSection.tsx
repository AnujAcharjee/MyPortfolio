'use client';

import { useEffect, useState } from 'react';
import { SOCIAL_LINKS } from '@/constants/socialLinks';
import { ContactMeModal } from '@/components/body/ContactMe/ContactMeModal';

export function SocialSection() {
  const [isActive, setIsActive] = useState<boolean>(false);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isActive]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsActive(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div id="contact" className="flex items-center gap-3">
      {SOCIAL_LINKS.map((item, index) =>
        item.url ?
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center
              w-9 h-9 rounded-full
              text-white/30 text-base
              border border-white/8
              hover:text-white hover:border-white/20 hover:bg-white/5
              transition-all duration-200
            "
          >
            <i className={item.icon} />
          </a>
        : <div
            key={index}
            className="
              flex items-center justify-center
              w-9 h-9 rounded-full
              text-white/15 text-base
              border border-white/5
              cursor-not-allowed
            "
          >
            <i className={item.icon} />
          </div>,
      )}

      <button
        onClick={() => setIsActive(true)}
        className="
          flex items-center justify-center
          w-9 h-9 rounded-full
          text-white/30 text-base
          border border-white/8
          hover:text-white hover:border-white/20 hover:bg-white/5
          transition-all duration-200
          cursor-pointer
        "
      >
        <i className="bi bi-envelope-at-fill" />
      </button>

      <ContactMeModal isActive={isActive} onClose={() => setIsActive(false)} />
    </div>
  );
}
