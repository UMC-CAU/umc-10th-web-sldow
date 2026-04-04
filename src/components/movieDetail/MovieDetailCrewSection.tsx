import type { Crew } from "../../types/credit";

const KEY_CREW_JOBS = new Set(["Director", "Producer", "Screenplay"]);

type MovieDetailCrewSectionProps = {
  crew: Crew[];
  limit?: number;
};

export function MovieDetailCrewSection({
  crew,
  limit = 6,
}: MovieDetailCrewSectionProps) {
  const featured = crew.filter((c) => KEY_CREW_JOBS.has(c.job)).slice(0, limit);

  if (featured.length === 0) return null;

  return (
    <section
      className="mt-24 pb-20"
      aria-labelledby="movie-detail-crew-heading"
    >
      <h2
        id="movie-detail-crew-heading"
        className="mb-10 text-4xl font-black tracking-tight text-white"
      >
        주요 제작진
      </h2>
      <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {featured.map((member, idx) => (
          <li key={`${member.id}-${member.job}-${idx}`} className="flex flex-col">
            <span className="text-lg font-bold text-white">{member.name}</span>
            <span className="text-sm font-semibold uppercase tracking-widest text-pink-500">
              {member.job}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
