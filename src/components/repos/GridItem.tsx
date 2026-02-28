'use client';

import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Star, GitFork, ArrowUpRight, Globe } from 'lucide-react';
import { LANGUAGE_COLORS } from '@/constants/languageColors';
import type { NormalizedRepo } from '@/lib/github';

export function GridItem({ repo }: { repo: NormalizedRepo }) {
  return (
    <li className="list-none">
      <div className="relative h-full rounded-xl border p-1">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />

        <div className="relative flex h-full flex-col rounded-lg p-3 dark:shadow-[0_0_20px_#2D2D2D]">
          {/* Top */}
          <div onClick={() => window.open(repo.url, '_blank')} className="space-y-2 cursor-pointer">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base dark:text-white truncate">{repo.name}</h3>
              <ArrowUpRight className="w-4 h-4 text-neutral-500" />
            </div>

            <p className="text-xs text-neutral-400 line-clamp-2 min-h-8">
              {repo.description || 'No description provided.'}
            </p>
          </div>

          {/* Bottom — always at end */}
          <div className="mt-auto flex items-center gap-4 text-xs text-neutral-400 pt-3">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${LANGUAGE_COLORS[repo.language] || 'bg-neutral-500'}`}
                />
                {repo.language}
              </div>
            )}

            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5" />
              {repo.stars}
            </div>

            <div className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5" />
              {repo.forks}
            </div>

            {repo.homepage && (
              <div
                onClick={() => window.open(repo.homepage, '_blank')}
                className="flex items-center gap-1 text-sky-500 hover:underline"
              >
                <Globe className="w-3.5 h-3.5" />
                LIVE
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
