import { useState, type FormEvent } from 'react';
import { useSearchMovies } from '../hooks/useSearchMovies';
import { MovieCard } from '../components/MovieCard';
import type { Language, SearchParams } from '../types/movie';

const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: 'ko-KR', label: '한국어' },
  { value: 'en-US', label: '영어' },
  { value: 'ja-JP', label: '일본어' },
];

export const SearchPage = () => {
  const [title, setTitle] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState<Language>('ko-KR');
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const { data, isFetching, isError } = useSearchMovies(searchParams);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSearchParams({ query: title.trim(), includeAdult, language });
  };

  const movies = data?.results ?? [];

  return (
    <div className="min-h-screen bg-neutral-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-md"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 영화 제목 */}
          <div>
            <label className="mb-2 block text-center font-semibold text-neutral-700">
              🎬 영화 제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="영화 제목을 입력하세요"
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* 옵션 (성인 콘텐츠) */}
          <div>
            <label className="mb-2 block text-center font-semibold text-neutral-700">
              ⚙️ 옵션
            </label>
            <label className="flex h-[50px] cursor-pointer items-center gap-2 rounded-lg border border-neutral-300 px-4">
              <input
                type="checkbox"
                checked={includeAdult}
                onChange={(e) => setIncludeAdult(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-neutral-700">성인 콘텐츠 표시</span>
            </label>
          </div>
        </div>

        {/* 언어 선택 */}
        <div className="mt-6">
          <label className="mb-2 block text-center font-semibold text-neutral-700">
            🌐 언어
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          검색
        </button>
      </form>

      {/* 결과 영역 */}
      <div className="mx-auto mt-8 max-w-5xl">
        {isFetching && (
          <p className="py-10 text-center text-neutral-500">검색 중...</p>
        )}

        {isError && (
          <p className="py-10 text-center text-red-500">
            검색 중 오류가 발생했습니다.
          </p>
        )}

        {!isFetching && !isError && searchParams && movies.length === 0 && (
          <p className="py-10 text-center text-neutral-500">
            검색 결과가 없습니다.
          </p>
        )}

        {!isFetching && movies.length > 0 && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
