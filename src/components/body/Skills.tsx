'use client';

import React from 'react';
import { HoverBorderGradient } from '../ui/hover-border-gradient';
import { ChevronsLeftRight, Wrench, Frame, Server } from 'lucide-react';
import { TypewriterEffect } from '../ui/typewriter-effect';
import { SKILL_WORDS } from '@/constants/typewriterWords';

const SKILLS = [
  {
    key: '01',
    label: 'Languages',
    icon: <ChevronsLeftRight size={14} />,
    items: ['TypeScript', 'JavaScript', 'C++'],
    accent: '#38bdf8',
  },
  {
    key: '02',
    label: 'Frontend',
    icon: <Frame size={14} />,
    items: ['React', 'Next.js', 'Tailwind CSS'],
    accent: '#818cf8',
  },
  {
    key: '03',
    label: 'Backend',
    icon: <Server size={14} />,
    items: ['Express.js', 'MongoDB', 'PostgreSQL', 'Prisma', 'Redis'],
    accent: '#34d399',
  },
  {
    key: '04',
    label: 'DevOps & Infra',
    icon: <Wrench size={14} />,
    items: ['Docker', 'Git & GitHub', 'GitHub Actions', 'Kafka', 'AWS'],
    accent: '#f59e0b',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="w-full flex flex-col items-start gap-4 px-2 sm:py-10">
      {/* Header */}
      <TypewriterEffect words={SKILL_WORDS} cursorClassName="!h-3 !w-0.5 sm:!h-4" />

      {/* Card */}
      <HoverBorderGradient
        containerClassName="w-full rounded-2xl"
        as="div"
        className="rounded-2xl bg-card overflow-hidden w-full"
      >
        {/* Top bar */}
        <div className="flex items-center gap-1.5 px-4 sm:px-5 py-3">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
          {/* <span className='font-mono text-[10px] tracking-[0.2em]'> techStack</span> */}
        </div>

        <div className="p-4 sm:p-5 font-mono">
          {SKILLS.map((skill, idx) => (
            <div key={skill.key} className="py-4 first:pt-0 last:pb-0">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-md shrink-0"
                  style={{
                    color: skill.accent,
                    backgroundColor: `${skill.accent}18`,
                  }}
                >
                  {skill.icon}
                </span>

                <h2 className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-widest whitespace-nowrap">
                  {skill.label}
                </h2>

                <div className="flex-1 h-px bg-white/5" />

                <span className="text-[10px] sm:text-xs text-white/20">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {skill.items.map((item) => (
                  <SkillPill key={item} label={item} accent={skill.accent} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </HoverBorderGradient>
    </section>
  );
}

function SkillPill({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="
        group relative inline-flex items-center gap-1.5
        px-2.5 sm:px-3
        py-1 sm:py-1.5
        text-[11px] sm:text-[12px]
        font-medium tracking-[0.02em]
        rounded-md
        bg-white/4
        border border-white/8
        text-white/55
        cursor-default
        transition-all duration-200 ease-out
        hover:-translate-y-1
        hover:text-white/85
        whitespace-nowrap
      "
      style={
        {
          '--accent': accent,
        } as React.CSSProperties
      }
    >
      {/* Background Glow */}
      <span
        className="
          absolute inset-0 rounded-md opacity-0
          group-hover:opacity-100
          transition-opacity duration-200
          pointer-events-none
        "
        style={{
          backgroundColor: `${accent}10`,
          boxShadow: `0 4px 12px ${accent}15`,
        }}
      />

      {/* Border Accent */}
      <span
        className="absolute inset-0 rounded-md pointer-events-none"
        style={{ border: `1px solid ${accent}40` }}
      />

      {/* Dot */}
      <span
        className="
          w-1 h-1 rounded-full
          bg-white/20
          transition-colors duration-200
          relative z-10
        "
        style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
      />

      {/* Label */}
      <span className="relative z-10">{label}</span>
    </span>
  );
}
