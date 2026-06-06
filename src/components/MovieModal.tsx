import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';

const formatDate = (date: string) => {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};

type MovieModalProps = {
  movie: Movie;
  onClose: () => void;
};

export const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const imdbUrl = `https://www.imdb.com/find?q=${encodeURIComponent(
    movie.title,
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* 포스터 */}
        <div className="relative aspect-2/3 max-h-[55vh] w-full overflow-hidden rounded-t-2xl bg-neutral-200">
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
          <span className="absolute right-3 top-3 rounded-md bg-blue-600 px-2.5 py-1 text-sm font-bold text-white">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* 정보 */}
        <div className="p-6">
          <h2
            id="movie-modal-title"
            className="text-xl font-bold text-neutral-900"
          >
            {movie.title}
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            개봉일: {formatDate(movie.release_date)}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700">
            {movie.overview || '줄거리 정보가 없습니다.'}
          </p>

          {/* 버튼 영역 */}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              to={`/movies/${movie.id}`}
              className="rounded-lg bg-blue-600 py-2.5 text-center font-semibold text-white transition-colors hover:bg-blue-700"
            >
              상세 페이지로 이동
            </Link>
            <div className="flex gap-3">
              <a
                href={imdbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-yellow-400 py-2.5 text-center font-semibold text-neutral-900 transition-colors hover:bg-yellow-500"
              >
                IMDb에서 검색하기
              </a>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-neutral-300 py-2.5 font-semibold text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
