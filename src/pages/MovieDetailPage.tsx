import { MovieListError } from "../components/error";
import { MovieListLoading } from "../components/loading";
import { MovieDetailCastSection } from "../components/movieDetail/MovieDetailCastSection";
import { MovieDetailCrewSection } from "../components/movieDetail/MovieDetailCrewSection";
import { useMovieDetail } from "../hooks/useMovieDetail";

export function MovieDetailPage() {
  const { movie, credits, isLoading, error } = useMovieDetail();

  if (error) {
    return (
      <div className="p-4">
        <MovieListError message={error} /> 
      </div>
    );
  }

  if (isLoading || !movie) {
    return (
      <div className="p-4">
        <MovieListLoading />
      </div>
    );
  }

  const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  
  return (
    <main className="relative min-h-screen w-full bg-black text-white">
          <div
            className="absolute inset-0 h-[60vh] w-full bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${backdrop})` }}
            aria-hidden
          />
          <div
            className="absolute inset-0 h-[60vh] w-full bg-gradient-to-t from-black to-transparent"
            aria-hidden
          />
  
      <article className="relative z-10 mx-auto max-w-6xl p-6 pt-32">
        <header className="flex flex-col gap-10 md:flex-row">
          <div className="flex-1">
            <h1 className="mb-4 text-5xl font-black md:text-7xl">{movie.title}</h1>

            <p className="mb-8 flex flex-wrap items-center gap-4">
              <span className="text-2xl font-bold text-yellow-500">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              <span className="h-1 w-1 rounded-full bg-neutral-600" aria-hidden />
              <time
                className="text-lg font-medium text-neutral-400"
                dateTime={movie.release_date}
              >
                {movie.release_date.split("-")[0]}
              </time>
              <span className="h-1 w-1 rounded-full bg-neutral-600" aria-hidden />
              <span className="text-lg font-medium text-neutral-400">
                {movie.runtime > 0 ? `${movie.runtime}분` : "상영시간 미상"}
              </span>
            </p>
          </div>
        </header>

        <section
          className="mb-10"
          aria-labelledby="movie-detail-overview-heading"
        >
          <h2
            id="movie-detail-overview-heading"
            className="mb-4 inline-block border-b border-pink-500/30 pb-2 text-2xl font-bold text-white/90"
          >
            줄거리
          </h2>
          <blockquote className="max-w-2xl text-xl font-light italic leading-relaxed text-neutral-300">
            <p>
              {movie.overview || "등록된 줄거리가 없습니다."}
            </p>
          </blockquote>
        </section>

        {credits && (
          <>
            <MovieDetailCastSection cast={credits.cast} />
            <MovieDetailCrewSection crew={credits.crew} />
          </>
        )}
      </article>
    </main>
  );
}
