'use client';

import { useEffect, useId, useState } from 'react';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { PROJECT_WORDS } from '@/constants/typewriterWords';
import { PROJECTS } from '@/constants/projects';
import { ProjectModal } from './ProjectModal';
import { ProjectRow } from './ProjectRow';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

export default function Projects() {
  const [active, setActive] = useState<(typeof PROJECTS)[number] | null>(null);
  const id = useId();

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [active]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section id="work" className=" flex flex-col items-start gap-4 px-2">
      {/* Header */}
      <TypewriterEffect words={PROJECT_WORDS} cursorClassName="!h-3 !w-0.5 sm:!h-4" />

      {/* Modal */}
      <ProjectModal active={active} id={id} onClose={() => setActive(null)} />

      {/* List */}
      <HoverBorderGradient
        containerClassName="w-full max-w-4xl rounded-2xl p-[1px]"
        as="div"
        className="rounded-2xl bg-card overflow-hidden w-full p-3 shadow-[0_0_20px_#2D2D2D]"
      >
        <div className="w-full rounded-2xl overflow-hidden">
          {/* Column headers */}
          <div className="hidden md:grid grid-cols-[2rem_2.5rem_1fr_auto] gap-4 px-5 py-2 border-b border-white/5 text-[10px] font-mono text-white/20 uppercase tracking-widest">
            <span>idx</span>
            <span>thumb</span>
            <span>product</span>
            {/* <span>action</span> */}
          </div>

          <ul className="divide-y divide-white/5">
            {PROJECTS.map((card, index) => (
              <ProjectRow
                key={card.title}
                card={card}
                index={index}
                id={id}
                onClick={() => setActive(card)}
              />
            ))}
          </ul>
        </div>
      </HoverBorderGradient>
    </section>
  );
}
