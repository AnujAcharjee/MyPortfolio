import { Star, Box, BookMarked, PanelsTopLeft, BookOpen } from 'lucide-react';

export default function Nav2({ numRepos }: { numRepos: number }) {
  const items = [
    { icon: BookOpen, name: 'Overview', count: null },
    { icon: BookMarked, name: 'Public Repositories', count: numRepos },
    { icon: PanelsTopLeft, name: 'Projects', count: null },
    { icon: Box, name: 'Packages', count: null },
    { icon: Star, name: 'Stars', count: null },
  ];

  return (
    <div className="overflow-x-auto scrollbar-hide md:overflow-visible">
      <div className="flex items-center gap-6 h-12 px-6 border-b border-white/30 whitespace-nowrap">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="shrink-0 flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-white cursor-not-allowed transition"
            >
              <Icon size={16} />
              <span>{item.name}</span>

              {item.count !== null && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-white/10 rounded-full text-white/80">
                  {item.count.toLocaleString()}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}