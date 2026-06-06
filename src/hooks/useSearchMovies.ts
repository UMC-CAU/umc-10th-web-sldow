import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../apis/movieApi';
import type { SearchParams } from '../types/movie';

export const useSearchMovies = (params: SearchParams | null) => {
  return useQuery({
    queryKey: ['searchMovies', params],
    queryFn: () => searchMovies(params!),
    enabled: !!params && params.query.trim().length > 0,
  });
};
