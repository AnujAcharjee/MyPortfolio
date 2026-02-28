import Image from 'next/image';
import { GridItem } from '@/components/repos/GridItem';
import { SOCIAL_LINKS } from '@/constants/socialLinks';
import { MapPin } from 'lucide-react';
import { getPinnedRepos } from '@/lib/github';

export default async function HeroSection() {
  const pinnedRepos = await getPinnedRepos();

  return (
    <div className="flex items-start w-full gap-6 h-screen px-6 py-8 bg-card border-b border-border">
      {/* Left section */}
      <div className="w-full md:w-1/3 h-auto flex flex-col items-center justify-center text-center">
        <Image src="/avatar.jpeg" alt="User avatar" width={250} height={250} className="rounded-full" />

        <div className="my-5 font-sans pb-2 border-b border-white/30">
          <p className="font-bold text-3xl">Anuj</p>
          <p className="font-mono text-gray-500">AnujAcharjee · he/him</p>
          <p className="flex gap-x-1 justify-center items-center font-mono text-gray-500">
            <MapPin size={14} />
            India
          </p>

          <p className="mt-4">I make full-stack products that people love using.</p>
          <p>I play, read, and drink coffee for fun.</p>

          <p className="mt-4 font-mono text-sm text-gray-500">
            Developer · OSS contributor · Indie hacker · Student
          </p>
        </div>

        <div className="flex gap-8 text-3xl">
          {SOCIAL_LINKS.map((item, index) =>
            item.url ?
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition"
              >
                <i className={item.icon} />
              </a>
            : <div key={index} className="text-gray-500 cursor-not-allowed">
                <i className={item.icon} />
              </div>,
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex flex-col gap-y-1 w-2/3">
        <p className="text-sm font-semibold">Pinned</p>

        {/* Projects */}
        <ul className="grid grid-cols-2 grid-rows-2 gap-6 my-3">
          {pinnedRepos.map((repo) => (
            <GridItem key={repo.name} repo={repo} />
          ))}
        </ul>

        {/* Contributions */}
      </div>
    </div>
  );
}
