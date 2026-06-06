export type Movie = {
  adult: boolean;
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Language = 'ko-KR' | 'en-US' | 'ja-JP';

export type SearchParams = {
  query: string;
  includeAdult: boolean;
  language: Language;
};
