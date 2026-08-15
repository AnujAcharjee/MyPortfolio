import {
  NormalizedRepo,
  Repo,
  GraphQLResponse,
  ContributionCalendar,
  ContributionGraphResponse,
} from '@/types/github';

export async function getRepos(): Promise<NormalizedRepo[]> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch('https://api.github.com/users/AnujAcharjee/repos', {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch GitHub repos: ${res.status} ${res.statusText}`);
      return [];
    }

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
  } catch (error) {
    console.error('Error in getRepos:', error);
    return [];
  }
}

export async function getPinnedRepos(): Promise<NormalizedRepo[]> {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      console.warn('GITHUB_TOKEN is not defined. Skipping pinned repos fetch.');
      return [];
    }

    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
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

    if (!res.ok) {
      console.error(`Failed to fetch pinned repos: ${res.status} ${res.statusText}`);
      return [];
    }

    const json: GraphQLResponse = await res.json();

    return json.data.user.pinnedItems.nodes.map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage?.name ?? null,
    }));
  } catch (error) {
    console.error('Error in getPinnedRepos:', error);
    return [];
  }
}

export async function getContributionGraph(): Promise<ContributionCalendar> {
  const emptyCalendar: ContributionCalendar = {
    totalContributions: 0,
    weeks: [],
  };

  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      console.warn('GITHUB_TOKEN is not defined. Skipping contribution graph fetch.');
      return emptyCalendar;
    }

    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
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
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch contribution graph: ${res.status} ${res.statusText}`);
      return emptyCalendar;
    }

    const json: ContributionGraphResponse = await res.json();

    if (!json.data) {
      console.error('GitHub API error:', json);
      return emptyCalendar;
    }

    return json.data.viewer.contributionsCollection.contributionCalendar;
  } catch (error) {
    console.error('Error in getContributionGraph:', error);
    return emptyCalendar;
  }
}
