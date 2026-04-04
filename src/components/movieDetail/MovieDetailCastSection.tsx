import type { Cast } from "../../types/credit";
import { CastMemberCard } from "./CastMemberCard";

type MovieDetailCastSectionProps = {
  cast: Cast[];
  limit?: number;
};

export function MovieDetailCastSection({
  cast,
  limit = 12,
}: MovieDetailCastSectionProps) {
  if (cast.length === 0) return null;

  const items = cast.slice(0, limit);

  return (
    <section
      className="mt-24"
      aria-labelledby="movie-detail-cast-heading"
    >
      <header className="mb-10 flex items-end justify-between">
        <h2
          id="movie-detail-cast-heading"
          className="text-4xl font-black tracking-tight text-white"
        >
          출연진
        </h2>
        <div
          className="mx-8 mb-4 h-1 flex-1 rounded-full bg-neutral-800 opacity-50"
          aria-hidden
        />
      </header>
      <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((actor) => (
          <CastMemberCard key={`${actor.id}-${actor.character}`} actor={actor} />
        ))}
      </ul>
    </section>
  );
}
