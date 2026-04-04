import {
  Menu,
  Search,
  SquareSlash,
  BookMarked,
  CircleDot,
  GitPullRequestArrow,
  Inbox,
  Plus,
  ChevronDown,
  Star,
  Box,
  PanelsTopLeft,
  BookOpen,
} from 'lucide-react';
import Image from 'next/image';

export default function Navbar({ numRepos }: { numRepos: number }) {
  const items = [
    { icon: BookOpen, name: 'Overview', count: null },
    { icon: BookMarked, name: 'Public Repositories', count: numRepos },
    { icon: PanelsTopLeft, name: 'Projects', count: null },
    { icon: Box, name: 'Packages', count: null },
    { icon: Star, name: 'Stars', count: null },
  ];

  return (
    <header className="w-full bg-card">
      {/* Top */}
      <div className="flex items-center justify-between h-12 px-6">
        {/* Left Section */}
        <section className="flex items-center gap-4">
          <div className="p-1 border border-white/20 rounded-sm hover:border-white/50 cursor-not-allowed">
            <Menu color="#8a8a8a" size={20} />
          </div>

          {/* <div className='px-1.5 py-0.5 border border-white/20 rounded-full hover:border-white/50'>
            <i className="bi bi-mortarboard-fill text-xl"></i>
          </div> */}
          {/* <i className="bi bi-github text-2xl cursor-not-allowed"></i> */}

          <div>
            <span className="hidden sm:block font-bold text-md hover:text-white/70">AnujAcharjee</span>
          </div>
        </section>

        {/* Right Section */}
        <section className="hidden sm:flex items-center justify-end gap-4">
          {/* Search */}
          <div className="flex items-center justify-between w-58 px-3 py-1.5 bg-[#0d1117] border border-white/20 rounded-md text-sm text-white/70 hover:border-white/30 transition cursor-not-allowed">
            <div className="flex items-center gap-2">
              <Search size={16} />
              <div className="flex gap-1">
                <span>Type</span>
                <SquareSlash size={20} />
                <span>to search</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 p-1 border border-white/20 rounded-md hover:border-white/30 transition cursor-not-allowed">
            <Plus size={20} color="#8a8a8a" />
            <ChevronDown size={16} color="#8a8a8a" />
          </div>

          <div className="flex items-center gap-1 p-1 border border-white/20 rounded-md hover:border-white/30 transition cursor-not-allowed">
            <CircleDot size={20} color="#8a8a8a" />
          </div>

          <div className="flex items-center gap-1 p-1 border border-white/20 rounded-md hover:border-white/30 transition cursor-not-allowed">
            <GitPullRequestArrow size={20} color="#8a8a8a" />
          </div>

          <div className="flex items-center gap-1 p-1 border border-white/20  rounded-md hover:border-white/30 transition cursor-not-allowed">
            <BookMarked size={20} color="#8a8a8a" />
          </div>

          <div className="relative flex items-center gap-1 p-1 border border-white/20 rounded-md hover:border-white/30 transition cursor-not-allowed">
            <Inbox size={20} color="#8a8a8a" />

            {/* Blue notification dot */}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border border-[#0d1117]" />
          </div>

          <Image src="/avatar.jpeg" alt="User avatar" width={32} height={32} className="rounded-full" />
        </section>
      </div>

      {/* Bottom */}
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
    </header>
  );
}
