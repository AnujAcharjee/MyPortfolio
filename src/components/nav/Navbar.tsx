import {
  Menu,
  Search,
  SquareSlash,
  BookMarked,
  CircleDot,
  GitPullRequestArrow,
  Bell,
  Plus,
  ChevronDown,
  Settings,
  Share2,
} from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="w-full text-white px-6">
      {/* Large and mid screen */}
      <div className="hidden md:flex items-center justify-between h-12">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="p-1 border border-white/20 rounded-sm hover:border-white/50 cursor-pointer">
            <Menu color="#8a8a8a" size={20} />
          </div>

          <i className="bi bi-github text-2xl cursor-pointer"></i>

          <div>
            <span className="font-sans font-bold text-md hover:text-white/70 cursor-pointer">
              AnujAcharjee
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end gap-4">
          {/* Search */}
          <div className="flex items-center justify-between w-58 px-3 py-1.5 bg-[#0d1117] border border-white/20 rounded-md text-sm text-white/70 hover:border-white/30 transition cursor-pointer">
            <div className="flex items-center gap-2">
              <Search size={16} />
              <div className="flex gap-1">
                <span>Type</span>
                <SquareSlash size={20} />
                <span>to search</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 p-1 border border-white/20 rounded-md hover:border-white/30 transition cursor-pointer">
            <Plus size={20} color="#8a8a8a" />
            <ChevronDown size={16} color="#8a8a8a" />
          </div>

          <div className="flex items-center gap-1 p-1 border border-white/20 rounded-md hover:border-white/30 transition cursor-pointer">
            <CircleDot size={20} color="#8a8a8a" />
          </div>

          <div className="flex items-center gap-1 p-1 border border-white/20 rounded-md hover:border-white/30 transition cursor-pointer">
            <GitPullRequestArrow size={20} color="#8a8a8a" />
          </div>

          <div className="flex items-center gap-1 p-1 border border-white/20  rounded-md hover:border-white/30 transition cursor-pointer">
            <BookMarked size={20} color="#8a8a8a" />
          </div>

          <div className="relative flex items-center gap-1 p-1 border border-white/20 rounded-md hover:border-white/30 transition cursor-pointer">
            <Bell size={20} color="#8a8a8a" />

            {/* Blue notification dot */}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border border-[#0d1117]" />
          </div>

          <Image src="/avatar.jpeg" alt="User avatar" width={32} height={32} className="rounded-full" />
        </div>
      </div>

      {/* small screen */}
      <div className="flex sm:hidden items-center justify-end gap-4  py-2 ">
        <Share2 color="#70a7ff" />
        <Settings color="#70a7ff" />
      </div>
    </header>
  );
}
