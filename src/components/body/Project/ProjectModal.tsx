'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { SquareArrowOutUpRight, CircleX } from 'lucide-react';
import type { Project } from '@/constants/projects';

interface ProjectModalProps {
  active: Project | null;
  id: string;
  onClose: () => void;
}

export function ProjectModal({ active, id, onClose }: ProjectModalProps) {
  const ref = useRef<HTMLDivElement>(null!);
  useOutsideClick(ref, onClose);

  return (
    <AnimatePresence>
      {active && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10"
          />

          {/* Modal */}
          <div className="fixed inset-0 grid place-items-center z-100 p-4">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-140 h-full md:h-fit md:max-h-[92%] flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117]"
            >
              {/* Image */}
              <motion.div layoutId={`image-${active.title}-${id}`} className="relative w-full h-65 shrink-0">
                <Image src={active.img} alt={active.title} fill className="object-cover object-top" />

                {/* overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0d1117] via-[#0d1117]/20 to-transparent" />

                {/* close button — only visible on small screens */}
                <motion.button
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  onClick={onClose}
                  className="lg:hidden absolute top-3 right-3 z-20
                    flex items-center justify-center
                    p-2 rounded-full
                    bg-black/60 backdrop-blur
                    border border-white/20
                    hover:bg-red-500/80 hover:border-red-400
                    transition-colors"
                >
                  <CircleX size={18} className="text-white" />
                </motion.button>
              </motion.div>

              {/* Body */}
              <div className="flex flex-col p-4 min-h-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-6">
                  {/* Left */}
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-sky-400/50 tracking-widest uppercase">
                      repo
                    </span>

                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-semibold text-white/90 font-mono text-lg md:text-xl mt-1"
                    >
                      {active.title}
                    </motion.h3>

                    {/* <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-white/50 text-xs md:text-sm font-mono mt-1 pb-4"
                    >
                      {active.description}
                    </motion.p> */}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {active.gitHubLink && (
                      <motion.a
                        layoutId={`github-${active.title}-${id}`}
                        href={active.gitHubLink}
                        target="_blank"
                        className="flex items-center justify-center px-1.5 py-1 rounded-full 
                          hover:bg-sky-500/20 transition-colors"
                      >
                        <i className="bi bi-github text-xl md:text-2xl text-white/80"></i>
                      </motion.a>
                    )}

                    {active.webLink && (
                      <motion.a
                        layoutId={`live-${active.title}-${id}`}
                        href={active.webLink}
                        target="_blank"
                        className="flex items-center gap-2 p-2
                          text-xs rounded-md font-mono font-semibold 
                          bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 
                          border border-sky-500/25 transition-colors"
                      >
                        <span>LIVE</span>
                        <SquareArrowOutUpRight size={12} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/6" />

                {/* Content */}
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-white/50 text-sm md:text-[15px] font-mono leading-relaxed
                    md:h-fit py-4 overflow-auto 
                    [scrollbar-width:none] 
                    [mask:linear-gradient(to_bottom,white,white,transparent)]"
                >
                  {active.content}

                  {/* Divider */}
                  <div className="h-8 bg-transparent ph-2" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
