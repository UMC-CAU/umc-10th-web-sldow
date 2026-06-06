import type { Movie } from '../types/movie';

const formatDate = (date: string) => {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};

type MovieCardProps = {
  movie: Movie;
  onClick: () => void;
};

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-2/3 bg-neutral-200">
        {posterUrl ? (
          <img
            alt={movie.title}
            src={posterUrl}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
            No Image
          </div>
        )}
        <span className="absolute right-2 top-2 rounded-md bg-blue-600 px-2 py-1 text-xs font-bold text-white">
          {movie.vote_average.toFixed(1)}
        </span>
      </div>

      <div className="p-3">
        <h3 className="truncate text-center font-bold text-neutral-900">
          {movie.title}
        </h3>
        <p className="mt-1 text-center text-sm text-neutral-500">
          {formatDate(movie.release_date)}
        </p>
        <p className="mt-2 line-clamp-3 text-sm text-neutral-600">
          {movie.overview}
        </p>
      </div>
    </div>
  );
};
