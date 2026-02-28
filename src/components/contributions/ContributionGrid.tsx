'use client';

import { ContributionWeek } from '@/types/github';
import { CONTRIBUTION_COLORS } from '@/constants/colors';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { useMemo, useRef, useState, useEffect } from 'react';
import { BookMarked } from 'lucide-react';

interface ContributionGridProps {
  weeks: ContributionWeek[];
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

const DAY_LABEL_WIDTH = 28;

export default function ContributionGrid({ weeks }: ContributionGridProps) {
  const [tooltip, setTooltip] = useState<{ text: string } | null>(null);
  const weeksRowRef = useRef<HTMLDivElement>(null);

  // Real measured left-offsets of each week column, relative to weeksRowRef
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
      {/* Glow — unchanged */}
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

      {/* Card */}
      <div className="relative border border-white/10 rounded-2xl bg-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2.5">
            <BookMarked size={20} className="text-orange-500/50" />
            <span
              className="text-sm font-semibold text-white/80"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Public Contributions
            </span>
          </div>
          <span className="text-xs text-orange-400/80 font-mono tabular-nums">
            {totalContributions.toLocaleString()} this year
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent mx-5 mb-4" />

        <div className="px-4 pb-5">
          {/* Scroll on sm/md, fill on lg+ */}
          <div className="overflow-x-auto lg:overflow-visible scrollbar-hide">
            <div className="relative" style={{ minWidth: `${weeks.length * 14 + 32}px` }}>
              {/* ── Month labels ── */}
              {/* Offset by DAY_LABEL_WIDTH so labels align over their week columns */}
              <div className="relative h-5 mb-1" style={{ paddingLeft: `${DAY_LABEL_WIDTH}px` }}>
                {monthLabels.map(({ label, index }) => {
                  // Use real measured position when available (accounts for flex stretching on large screens)
                  const left =
                    colPositions.length > 0 && colPositions[index] !== undefined ?
                      colPositions[index]
                    : index * 14; // fallback before first measure
                  return (
                    <span
                      key={`${label}-${index}`}
                      className="absolute text-[10px] text-zinc-500 select-none whitespace-nowrap"
                      style={{ left: `${left}px`, fontFamily: "'Space Mono', monospace" }}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>

              {/* ── Day labels + week grid ── */}
              <div className="flex">
                {/* Day-of-week labels */}
                <div
                  className="flex flex-col justify-between pr-2 shrink-0"
                  style={{ width: `${DAY_LABEL_WIDTH}px`, paddingTop: '1px' }}
                >
                  {DAY_LABELS.map((d, i) => (
                    <div
                      key={i}
                      className="text-[9px] text-zinc-600 leading-none select-none"
                      style={{
                        height: '11px',
                        lineHeight: '11px',
                        fontFamily: "'Space Mono', monospace",
                        visibility: i % 2 === 0 ? 'visible' : 'hidden',
                      }}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Week columns — ref'd so we can measure their positions */}
                <div ref={weeksRowRef} className="flex gap-0.75 xl:gap-1 flex-1">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-0.75 xl:gap-1 flex-1">
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
                            'w-full aspect-square max-w-3.5',
                            'rounded-xs',
                            CONTRIBUTION_COLORS[day.contributionLevel],
                            'transition-all duration-150 hover:scale-[1.35] hover:rounded-sm cursor-pointer',
                          ].join(' ')}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer: inline tooltip + legend */}
          <div className="flex items-center justify-between mt-4">
            <div
              className="text-[11px] text-zinc-400 min-h-4 transition-opacity duration-150"
              style={{ fontFamily: "'Space Mono', monospace", opacity: tooltip ? 1 : 0 }}
            >
              {tooltip?.text ?? ''}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-zinc-600" style={{ fontFamily: "'Space Mono', monospace" }}>
                Less
              </span>
              {(
                ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'] as const
              ).map((level) => (
                <div
                  key={level}
                  className={`w-2.5 h-2.5 xl:w-3 xl:h-3 rounded-xs ${CONTRIBUTION_COLORS[level]}`}
                />
              ))}
              <span className="text-[10px] text-zinc-600" style={{ fontFamily: "'Space Mono', monospace" }}>
                More
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
