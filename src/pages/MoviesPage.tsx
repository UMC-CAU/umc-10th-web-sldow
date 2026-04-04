import { MovieCard } from "../components/MovieCard";
import { MovieListError } from "../components/error";
import { MovieListLoading } from "../components/loading";
import { Pagination } from "../components/Pagination";
import {
  useMovieList,
  type MovieListCategory,
} from "../hooks/useMovieList";

type MoviesPageProps = {
  category: MovieListCategory;
};

export function MoviesPage({ category }: MoviesPageProps) {
  const { movies, page, setPage, totalPages, error, isLoading } =
    useMovieList(category);

  return (
    <div className="p-4">
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      {error ? (
        <MovieListError message={error} />
      ) : isLoading ? (
        <MovieListLoading />
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
