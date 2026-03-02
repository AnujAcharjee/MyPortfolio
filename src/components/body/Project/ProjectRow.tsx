'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import type { Project } from '@/constants/projects';

interface ProjectRowProps {
  card: Project;
  index: number;
  id: string;
  onClick: () => void;
}

export function ProjectRow({ card, index, id, onClick }: ProjectRowProps) {
  return (
    <motion.li
      layoutId={`card-${card.title}-${id}`}
      key={`card-${card.title}-${id}`}
      onClick={onClick}
      className="group grid grid-cols-1 md:grid-cols-[2rem_auto_1fr_auto] gap-3 md:gap-4 items-center px-5 py-4 cursor-pointer hover:bg-white/3 transition-colors"
    >
      {/* Index */}
      <span className="hidden md:block text-xs font-mono text-white/20 group-hover:text-sky-500/50 transition-colors tabular-nums">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Thumbnail */}
      <motion.div layoutId={`image-${card.title}-${id}`} className="shrink-0">
        <Image
          src={card.img}
          alt={card.title}
          width={40}
          height={40}
          className="h-10 w-10 rounded-md object-cover object-top border border-white/10 group-hover:border-sky-500/30 transition-colors"
        />
      </motion.div>

      {/* Info */}
      <div className="min-w-0">
        <div className="flex items-center gap-5">
          <motion.h3
            layoutId={`title-${card.title}-${id}`}
            className="font-mono font-medium text-white/75 group-hover:text-sky-500 transition-colors text-md truncate"
          >
            {card.title}
          </motion.h3>
          {/* <span className="hidden sm:block shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/25 border border-white/6">
            public
          </span> */}
        </div>

        <motion.p
          layoutId={`description-${card.description}-${id}`}
          className="text-white/35 text-xs font-mono mt-0.5 wrap-break-words"
        >
          {card.description}
        </motion.p>
      </div>

      {/* CTA */}
      {/* <motion.button
        layoutId={`button-${card.title}-${id}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md font-mono font-medium bg-white/5 hover:bg-sky-500/15 text-white/40 hover:text-sky-400 border border-white/8 hover:border-sky-500/25 transition-all"
      >
        <SquareArrowOutUpRight size={11} />
        {card.ctaText}
      </motion.button> */}
    </motion.li>
  );
}
