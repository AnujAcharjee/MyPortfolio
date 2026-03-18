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
    <div id="contact" className="flex gap-8 text-3xl text-gray-500">
      {SOCIAL_LINKS.map((item, index) =>
        item.url ?
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <i className={item.icon} />
          </a>
        : <div key={index} className="cursor-not-allowed">
            <i className={item.icon} />
          </div>,
      )}

      <button onClick={() => setIsActive(true)} className="hover:text-white transition cursor-pointer">
        <i className="bi bi-envelope-at-fill" />
      </button>

      <ContactMeModal isActive={isActive} onClose={() => setIsActive(false)} />
    </div>
  );
}
