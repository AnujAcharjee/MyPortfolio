import Image from 'next/image';
import { GridItem } from '@/components/repos/GridItem';
import { SOCIAL_LINKS } from '@/constants/socialLinks';
import { MapPin } from 'lucide-react';
import { getPinnedRepos, getContributionGraph } from '@/lib/github';
import ContributionGrid from '@/components/contributions/ContributionGrid';

export default async function HeroSection() {
  const pinnedRepos = await getPinnedRepos();
  const graph = await getContributionGraph();

  return (
    <div id='about' className="sm:flex items-start w-full gap-6 sm:h-screen px-6 py-8 bg-card border-b border-border">
      {/* Left section */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center">
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
      <div className="hidden md:flex w-2/3 flex-col gap-y-6 mt-10 md:mt-0">
        {/* Pinned */}
        <section>
          <p className="text-sm font-semibold">Pinned</p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-3">
            {pinnedRepos.map((repo) => (
              <GridItem key={repo.name} repo={repo} />
            ))}
          </ul>
        </section>

        {/* Contributions */}
        <section className="space-y-6">
          <ContributionGrid weeks={graph.weeks} />
        </section>
      </div>

      {/* Small screen contributions */}
      <section className="w-full sm:hidden space-y-3 sm:space-y-6 mt-8">
        <ContributionGrid weeks={graph.weeks} />
      </section>
    </div>
  );
}
