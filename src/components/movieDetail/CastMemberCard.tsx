import type { Cast } from "../../types/credit";

type CastMemberCardProps = {
  actor: Cast;
};

export function CastMemberCard({ actor }: CastMemberCardProps) {
  const profileUrl = `https://image.tmdb.org/t/p/w200${actor.profile_path}`;

  return (
    <li className="group flex flex-col items-center">
      <figure
        className="relative mb-4 h-40 w-40 overflow-hidden rounded-full border-4 border-neutral-900 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-pink-500/50"
        aria-label={profileUrl ? undefined : `${actor.name}, 프로필 이미지 없음`}
      >
          <img
          src={profileUrl}
          alt={actor.name}
          className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
        />
      </figure>
      <p className="text-center text-lg font-bold text-white transition-colors group-hover:text-pink-400">
        {actor.name}
      </p>
      <p className="mt-1 text-center text-sm text-neutral-500">{actor.character}</p>
    </li>
  );
}
