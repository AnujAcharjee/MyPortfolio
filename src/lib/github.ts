export type NormalizedRepo = {
  id?: number;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  homepage?: string;
};

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url?: string;
  stargazers_count?: number;
  forks_count?: number;
  homepage?: string;
  language: string | null;
};

type PinnedRepo = {
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  url: string;
  primaryLanguage: {
    name: string;
  } | null;
};

type GraphQLResponse = {
  data: {
    user: {
      pinnedItems: {
        nodes: PinnedRepo[];
      };
    };
  };
};

export async function getRepos(): Promise<NormalizedRepo[]> {
  const res = await fetch('https://api.github.com/users/AnujAcharjee/repos', {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error('Failed to fetch GitHub repos');

  const data: Repo[] = await res.json();

  return data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    url: repo.html_url!,
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
    language: repo.language,
    homepage: repo.homepage,
  }));
}

export async function getPinnedRepos(): Promise<NormalizedRepo[]> {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          user(login: "AnujAcharjee") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  description
                  stargazerCount
                  forkCount
                  url
                  primaryLanguage {
                    name
                  }
                }
              }
            }
          }
        }
      `,
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error('Failed to fetch pinned repos');

  const json: GraphQLResponse = await res.json();

  return json.data.user.pinnedItems.nodes.map((repo) => ({
    name: repo.name,
    description: repo.description,
    url: repo.url,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    language: repo.primaryLanguage?.name ?? null,
  }));
}

export async function getContributionGraph() {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          viewer {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    contributionLevel
                  }
                }
              }
            }
          }
        }
      `,
    }),
    next: {
      revalidate: 86400, // cache 24h
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch contribution graph');
  }

  const json = await res.json();

  return json.data.viewer.contributionsCollection.contributionCalendar;
}
