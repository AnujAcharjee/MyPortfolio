import Navbar from '@/components/nav/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import Footer from '@/components/nav/Footer';
import RepoGridItem from '@/components/body/RepoGridItem';
import ContributionGrid from '@/components/body/ContributionGrid';
import Skills from '@/components/body/Skills';
import Projects from '@/components/body/Project/Projects';
import DynamicIsland from '@/components/nav/DynamicIsland';

import { getContributionGraph, getPinnedRepos, getRepos } from '@/lib/github';

export default async function Home() {
  const pinnedRepos = await getPinnedRepos();
  const graph = await getContributionGraph();

  const repos = await getRepos();

  return (
    <div>
      <Navbar numRepos={repos.length} />

      <div
        className="
          w-full
          px-4 sm:px-6 lg:px-10
          pt-8 pb-20 sm:pb-8 
          bg-linear-to-r from-background via-white/3 to-background
          flex flex-col
          md:flex-row
          gap-8
        "
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='none'/%3E%3Crect x='0' y='0' width='1' height='1' fill='rgba(255,255,255,0.03)'/%3E%3Crect x='2' y='2' width='1' height='1' fill='rgba(255,255,255,0.03)'/%3E%3C/svg%3E"),
            linear-gradient(to right, var(--background), rgba(255,255,255,0.03), var(--background))
          `,
          backgroundSize: '4px 4px, 100% 100%',
        }}
      >
        {/* LEFT - Fixed on md+ */}
        <main id="about" className="w-full md:w-1/3 md:sticky md:top-12 md:h-screen">
          <HeroSection />
        </main>

        {/* RIGHT - Scrollable on md+ */}
        <div
          className="
            w-full 
            md:w-2/3 
            flex flex-col gap-4
          "
        >
          {/* Pinned */}
          <div>
            <p className="text-sm font-semibold flex items-center gap-1">Pinned</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-3">
              {pinnedRepos.map((repo) => (
                <RepoGridItem key={repo.name} repo={repo} />
              ))}
            </ul>
          </div>

          <ContributionGrid weeks={graph.weeks} />

          <Projects />

          <Skills />

          <p className="text-sm font-mono text-white/40 tracking-wide mt-1 text-center">
            {"drop a message... let's connect 🤝"}
          </p>
        </div>
      </div>

      <DynamicIsland />
      <Footer />
    </div>
  );
}
