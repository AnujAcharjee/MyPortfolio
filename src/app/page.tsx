import Navbar from '@/components/nav/Navbar';
import Nav2 from '@/components/nav/Nav2';
import HeroSection from '@/components/HeroSection';

import { getRepos } from '@/lib/github';

export default async function Home() {
  const repos = await getRepos();
  // console.log(repos);

  return (
    <main>
      <Navbar />
      <Nav2 numRepos={repos.length} />
      <HeroSection />

      {/* <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 my-6">
        {repos.map((repo) => (
          // <GridItem key={repo.id} repo={repo} />
        ))}
      </ul> */}
    </main>
  );
}
