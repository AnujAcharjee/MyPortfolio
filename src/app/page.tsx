import Navbar from '@/components/nav/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import Footer from '@/components/Footer';
import RepoGridItem from '@/components/body/RepoGridItem';
import ContributionGrid from '@/components/body/ContributionGrid';
import Skills from '@/components/body/Skills';
import Projects from '@/components/body/Project/Projects';

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
          py-8
          bg-card
          flex flex-col
          md:flex-row
          gap-8
        "
      >
        {/* LEFT - Fixed on md+ */}
        <main
          id="about"
          className="w-full md:w-1/3 md:sticky md:top-12 md:h-screen"
        >
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
            <p className="text-sm font-semibold">Pinned</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-3">
              {pinnedRepos.map((repo) => (
                <RepoGridItem key={repo.name} repo={repo} />
              ))}
            </ul>
          </div>

          {/* Contributions */}
          <ContributionGrid weeks={graph.weeks} />

          {/* Skills */}
          <Skills />

          {/* Projects */}
          <Projects />
        </div>
      </div>

      <Footer />
    </div>
  );
}
