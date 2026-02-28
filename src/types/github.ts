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

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url?: string;
  stargazers_count?: number;
  forks_count?: number;
  homepage?: string;
  language: string | null;
};

export type PinnedRepo = {
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  url: string;
  primaryLanguage: {
    name: string;
  } | null;
};

export type GraphQLResponse = {
  data: {
    user: {
      pinnedItems: {
        nodes: PinnedRepo[];
      };
    };
  };
};

// CONTRIBUTIONS

export type ContributionLevel =
  | 'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE';

export interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface ContributionGraphResponse {
  data: {
    viewer: {
      contributionsCollection: {
        contributionCalendar: ContributionCalendar;
      };
    };
  };
}
