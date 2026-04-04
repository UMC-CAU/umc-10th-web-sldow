import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="group relative aspect-2/3 overflow-hidden rounded-lg bg-neutral-800">
        <img
          alt={movie.title}
          src={posterUrl}
          className="h-full w-full object-cover transition-all duration-300 group-hover:blur-sm"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-2 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="font-bold text-white">{movie.title}</p>
          <p className="line-clamp-3 text-xs text-white">{movie.overview}</p>
        </div>
      </div>
    </Link>
  );
};
