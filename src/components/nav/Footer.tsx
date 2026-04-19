'use client';

import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { ContactMeModal } from '@/components/body/ContactMe/ContactMeModal';

const LINKS = {
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
  ],
};

export default function Footer() {
  const [isContactActive, setIsContactActive] = useState(false);
  const [isResumeActive, setIsResumeActive] = useState(false);

  return (
    <footer
      className="hidden sm:block w-full bg-card border-t border-white/8 relative overflow-hidden"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      {/* Subtle ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-orange-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-5 relative">
        {/* Left — nav groups */}
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-5">
            {LINKS.nav.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors duration-200 tracking-wide"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <span className="w-px h-3 bg-white/10" />

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsResumeActive(true)}
              className="text-xs text-sky-400/60 hover:text-sky-400 transition-colors duration-200 tracking-wide cursor-pointer"
            >
              Resume
            </button>

            <button
              onClick={() => setIsContactActive(true)}
              className="text-xs text-sky-400/60 hover:text-sky-400 transition-colors duration-200 tracking-wide cursor-pointer"
            >
              Connect
            </button>

            <ContactMeModal isActive={isContactActive} onClose={() => setIsContactActive(false)} />
          </div>
        </div>

        {/* Right — back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="flex items-center gap-1.5 text-xs text-white/80 hover:text-orange-400 transition-all duration-200 group border hover:border-orange-400/20 rounded px-3 py-1.5 hover:bg-orange-400/5"
        >
          <ArrowUp size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          top
        </button>
      </div>

      {/* Bottom strip */}
      {/* <div className="border-t border-white/5 py-3">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col sm:flex-row items-center justify-center gap-2">
          <p className="text-[10px] text-zinc-700 tracking-widest uppercase">
            © {new Date().getFullYear()} Anuj Acharjee
          </p>
        </div>
      </div> */}
    </footer>
  );
}
