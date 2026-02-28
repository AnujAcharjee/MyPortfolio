import Navbar from '@/components/nav/Navbar';
import Nav2 from '@/components/nav/Nav2';
import HeroSection from '@/components/hero/HeroSection';
import Footer from '@/components/Footer';
import Body from '@/components/body/Body';

import { getRepos } from '@/lib/github';

export default async function Home() {
  const repos = await getRepos();
  // console.log(repos);

  return (
    <main>
      <Navbar />
      <Nav2 numRepos={repos.length} />
      <HeroSection />
      <Body />
      <Footer />
    </main>
  );
}
