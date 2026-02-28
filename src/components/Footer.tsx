'use client';

import { ArrowUp } from 'lucide-react';

const LINKS = {
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left — name + nav */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <nav className="flex items-center gap-5">
            {LINKS.nav.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs text-zinc-500 hover:text-orange-400 transition-colors duration-200"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right — social + back to top */}
        <div className="flex items-center gap-4">
          {/* Divider */}
          <div className="w-px h-4 bg-white/10" />

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-orange-400 transition-colors duration-200 group"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <ArrowUp size={13} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
            Top
          </button>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/5 py-3 text-center">
        <p className="text-[10px] text-zinc-700" style={{ fontFamily: "'Space Mono', monospace" }}>
          © {new Date().getFullYear()} Anuj Acharjee — Built with Next.js, Aceternity UI & 🍵
        </p>
      </div>
    </footer>
  );
}
