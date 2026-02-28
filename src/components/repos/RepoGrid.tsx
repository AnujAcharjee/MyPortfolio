'use client';





export default function RepoGrid({ repos }: { repos: RepoProps[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 my-6">
      {repos.map((repo) => (
        <GridItem key={repo.id} repo={repo} />
      ))}
    </ul>
  );
}


