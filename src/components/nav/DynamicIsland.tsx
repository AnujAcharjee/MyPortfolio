'use client';

import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { ContactMeModal } from '@/components/body/ContactMe/ContactMeModal';
import { useActiveSection } from '@/hooks/use-active-section';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
];

export default function DynamicIsland() {
  const [expanded, setExpanded] = useState(false);
  const active = useActiveSection(['about', 'work', 'skills']);
  const [isContactActive, setIsContactActive] = useState(false);
  const islandRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="fixed sm:hidden bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div
          ref={islandRef}
          className="
            pointer-events-auto
            flex items-center
            px-4 py-2
            rounded-full
            bg-[#060d18]
            border border-sky-400/20
            shadow-[0_0_0_1px_rgba(56,189,248,0.05),0_8px_32px_rgba(0,0,0,0.7),0_0_24px_rgba(56,189,248,0.08)]
            transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            overflow-hidden
            cursor-pointer
            select-none
          "
          style={{
            width: expanded ? '310px' : '52px',
            justifyContent: expanded ? 'flex-start' : 'center',
          }}
          onClick={() => !expanded && setExpanded(true)}
        >
          {/* collapsed — blinking triple dot */}
          {!expanded && (
            <div className="flex items-center gap-1.25">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.25 h-1.25 rounded-full bg-sky-400/70"
                  style={{
                    animation: `islandBlink 1.4s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          )}

          {/* expanded — nav + close */}
          {expanded && (
            <div className="flex items-center gap-1 w-full animate-in fade-in duration-300">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    document
                      .getElementById(item.href.replace('#', ''))
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`
                    relative px-3 py-1.5 rounded-full
                    text-[9px] font-mono tracking-wide
                    transition-colors duration-200 whitespace-nowrap
                    ${active === item.href.replace('#', '') ? 'text-sky-300/90' : 'text-white/35 hover:text-white/65'}
                  `}
                >
                  {active === item.href.replace('#', '') && (
                    <span className="absolute inset-0 rounded-full bg-sky-400/8 border border-sky-400/20" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              ))}

              <span className="w-px h-3.5 bg-sky-400/10 shrink-0 mx-0.5" />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsContactActive(true);
                }}
                className="
                  px-2 py-1.5 rounded-full
                  text-[9px] font-mono tracking-wide
                  text-blue-400/50 hover:text-blue-300
                  transition-colors duration-200
                  whitespace-nowrap cursor-pointer
                "
              >
                Connect
              </button>

              <span className="w-px h-3.5 bg-sky-400/10 shrink-0 mx-0.5" />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
                className="
                  flex items-center justify-center
                  w-5 h-5 rounded-full shrink-0
                  bg-sky-400/10 hover:bg-sky-400/20
                  text-sky-400/60 hover:text-sky-300
                  border border-sky-400/15
                  transition-all duration-200
                  cursor-pointer
                "
              >
                <X size={9} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes islandBlink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>

      <ContactMeModal isActive={isContactActive} onClose={() => setIsContactActive(false)} />
    </>
  );
}
