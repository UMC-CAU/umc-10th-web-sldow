import { usePopularMovies } from "../hooks/usePopularMovies";
import { MovieCard } from "../components/MovieCard";

export function MoviesPage() {
  const { movies } = usePopularMovies();

  return (
    <div className="p-4">
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}
