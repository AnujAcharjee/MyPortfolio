'use client';

import { ContributionWeek } from '@/types/github';
import { CONTRIBUTION_COLORS } from '@/constants/colors';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface ContributionGridProps {
  weeks: ContributionWeek[];
}

const DAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', ''];

export default function ContributionGrid({ weeks }: ContributionGridProps) {
  // Extract month labels from first day of each week
  const months = weeks.map((week) => {
    const firstDay = week.contributionDays[0];
    const date = new Date(firstDay.date);
    return date.toLocaleString('default', { month: 'short' });
  });

  return (
    <div className="relative h-full p-4 border border-white/20 rounded-xl">
      <GlowingEffect
        blur={0}
        borderWidth={3}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />

      <div className="relative flex">
        {/* Left Day Labels */}
        <div className="flex flex-col gap-2 justify-between text-xs text-neutral-400 pr-2 pt-7">
          {DAY_LABELS.map((label, i) => (
            <div key={i} className="h-3">
              {label}
            </div>
          ))}
        </div>

        <div>
          {/* Month Labels */}
          <div className="flex gap-1 mb-2 text-xs text-neutral-400">
            {months.map((month, i) => (
              <div key={i} className="w-3 text-center">
                {i === 0 || month !== months[i - 1] ? month : ''}
              </div>
            ))}
          </div>

          {/* Contribution Grid */}
          <div className="flex gap-1">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-1">
                {week.contributionDays.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date} — ${day.contributionCount} contributions`}
                    className={`w-3 h-3 rounded-sm ${
                      CONTRIBUTION_COLORS[day.contributionLevel]
                    } transition-transform hover:scale-125`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
