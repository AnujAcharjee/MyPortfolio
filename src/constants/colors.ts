import { ContributionLevel } from '@/types/github';

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-pink-400',
  Java: 'bg-orange-500',
  CSS: 'bg-purple-500',
  HTML: 'bg-rose-500',
  C: 'bg-gray-400',
  'C++': 'bg-blue-600',
  Shell: 'bg-green-400',
  EJS: 'bg-orange-500',
};

export const CONTRIBUTION_COLORS: Record<ContributionLevel, string> = {
  NONE: 'bg-neutral-800',
  FIRST_QUARTILE: 'bg-green-900',
  SECOND_QUARTILE: 'bg-green-700',
  THIRD_QUARTILE: 'bg-green-500',
  FOURTH_QUARTILE: 'bg-green-400',
};
