import { getContributionGraph } from "@/lib/github";
import ContributionGrid from "./contributions/ContributionGrid";

export default async function Contributions() {
  const graph = await getContributionGraph();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold dark:text-white">
        {graph.totalContributions} Contributions This Year
      </h2>

      <ContributionGrid weeks={graph.weeks} />
    </section>
  );
}