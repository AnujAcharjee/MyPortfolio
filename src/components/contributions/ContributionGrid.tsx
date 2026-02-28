'use client';

interface Day {
  date: string;
  contributionCount: number;
  contributionLevel: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';
}

interface Week {
  contributionDays: Day[];
}

export default function ContributionGrid({ weeks }: { weeks: Week[] }) {
  const getColor = (level: Day['contributionLevel']) => {
    switch (level) {
      case 'NONE':
        return 'bg-neutral-800';
      case 'FIRST_QUARTILE':
        return 'bg-green-900';
      case 'SECOND_QUARTILE':
        return 'bg-green-700';
      case 'THIRD_QUARTILE':
        return 'bg-green-500';
      case 'FOURTH_QUARTILE':
        return 'bg-green-400';
      default:
        return 'bg-neutral-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-1">
            {week.contributionDays.map((day) => (
              <div
                key={day.date}
                title={`${day.date} — ${day.contributionCount} contributions`}
                className={`w-3 h-3 rounded-sm ${getColor(day.contributionLevel)} transition-transform hover:scale-125`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
