'use client';

import { ContributionWeek } from '@/types/github';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { useMemo, useRef, useState, useEffect } from 'react';
import { BookMarked } from 'lucide-react';

interface ContributionGridProps {
  weeks: ContributionWeek[];
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const GITHUB_COLORS: Record<string, string> = {
  NONE: 'bg-[#161b22] border border-[#1e2530]',
  FIRST_QUARTILE: 'bg-[#0e4429]',
  SECOND_QUARTILE: 'bg-[#006d32]',
  THIRD_QUARTILE: 'bg-[#26a641]',
  FOURTH_QUARTILE: 'bg-[#39d353]',
};

const DAY_LABEL_WIDTH = 28;

function buildMonthLabels(weeks: ContributionWeek[]) {
  const labels: { label: string; index: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const month = new Date(week.contributionDays[0].date).getMonth();
    if (month !== lastMonth) {
      labels.push({ label: MONTHS[month], index: i });
      lastMonth = month;
    }
  });
  return labels;
}

export default function ContributionGrid({ weeks }: ContributionGridProps) {
  const [tooltip, setTooltip] = useState<{ text: string } | null>(null);
  const weeksRowRef = useRef<HTMLDivElement>(null);
  const [colPositions, setColPositions] = useState<number[]>([]);

  useEffect(() => {
    function measure() {
      const row = weeksRowRef.current;
      if (!row) return;
      const rowLeft = row.getBoundingClientRect().left;
      const positions: number[] = Array.from(row.children).map(
        (el) => (el as HTMLElement).getBoundingClientRect().left - rowLeft,
      );
      setColPositions(positions);
    }

    measure();
    const ro = new ResizeObserver(measure);
    if (weeksRowRef.current) ro.observe(weeksRowRef.current);
    return () => ro.disconnect();
  }, [weeks]);

  const monthLabels = useMemo(() => buildMonthLabels(weeks), [weeks]);

  const totalContributions = useMemo(
    () => weeks.flatMap((w) => w.contributionDays).reduce((sum, d) => sum + d.contributionCount, 0),
    [weeks],
  );

  return (
    <div className="relative w-full rounded-2xl">
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-10">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
      </div>

      <div className="relative border border-white/10 rounded-2xl bg-card overflow-hidden p-3 shadow-[0_0_20px_#2D2D2D]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2.5">
            <BookMarked size={20} className="text-rose-gold" />
            <span className="text-sm font-semibold text-white/80 font-mono">Contributions</span>
          </div>
          <span className="text-xs text-soft-gold font-mono tabular-nums">
            {totalContributions.toLocaleString()} this year
          </span>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent mx-5 mb-4" />

        <div className="px-4 pb-5">
          <div className="overflow-x-auto lg:overflow-visible scrollbar-hide">
            <div className="relative w-full" style={{ minWidth: `${weeks.length * 14 + 32}px` }}>
              {/* Month labels */}
              <div className="relative h-5 mb-1">
                {monthLabels.map(({ label, index }) => {
                  const left =
                    colPositions.length > 0 && colPositions[index] !== undefined ?
                      colPositions[index] + DAY_LABEL_WIDTH
                    : index * 14 + DAY_LABEL_WIDTH;
                  return (
                    <span
                      key={`${label}-${index}`}
                      className="absolute text-[10px] text-[#7d8590] select-none whitespace-nowrap font-mono"
                      style={{ left: `${left}px` }}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>

              {/* Day labels + grid */}
              <div className="flex">
                {/* Day labels */}
                <div className="flex flex-col justify-between pr-2 pt-px shrink-0 w-7">
                  {DAY_LABELS.map((d, i) => (
                    <div
                      key={i}
                      className="text-[9px] text-[#7d8590] leading-none select-none h-2.75 font-mono"
                      style={{ visibility: i % 2 === 0 ? 'visible' : 'hidden' }}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Week columns */}
                <div ref={weeksRowRef} className="flex gap-0.5 sm:gap-0.75 flex-1">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-0.75 flex-1">
                      {week.contributionDays.map((day) => (
                        <div
                          key={day.date}
                          onMouseEnter={() =>
                            setTooltip({
                              text: `${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''} on ${new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
                            })
                          }
                          onMouseLeave={() => setTooltip(null)}
                          className={[
                            'w-full aspect-square rounded-xs',
                            GITHUB_COLORS[day.contributionLevel],
                            'transition-all duration-150 hover:scale-125 cursor-pointer',
                          ].join(' ')}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer: tooltip + legend */}
          <div className="flex items-center justify-between mt-4">
            <div
              className={[
                'text-[11px] text-[#7d8590] min-h-4 font-mono transition-opacity duration-150',
                tooltip ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
            >
              {tooltip?.text ?? ''}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-[#7d8590] font-mono">Less</span>
              {(
                ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'] as const
              ).map((level) => (
                <div key={level} className={`size-2.5 xl:size-3 rounded-xs ${GITHUB_COLORS[level]}`} />
              ))}
              <span className="text-[10px] text-[#7d8590] font-mono">More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
