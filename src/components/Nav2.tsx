import { Star, Box, BookMarked, PanelsTopLeft, BookOpen } from 'lucide-react';

export default function Nav2() {
  const items = [
    { icon: BookOpen, name: 'Overview', count: null },
    { icon: BookMarked, name: 'Repositories', count: 20 },
    { icon: PanelsTopLeft, name: 'Projects', count: null },
    { icon: Box, name: 'Packages', count: null },
    { icon: Star, name: 'Stars', count: null },
  ];

  return (
    <div className="hidden md:flex items-center w-full gap-6 h-12 px-6 border-b border-white/30">
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white cursor-pointer transition"
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
  );
}
