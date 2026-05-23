import { useInfiniteQuery } from '@tanstack/react-query';
import { getLpsListInfinite } from '../apis/userApi';

export function useLpsList(
  sort: 'latest' | 'oldest' = 'latest',
  search: string = '',
) {
  const order = sort === 'latest' ? 'desc' : 'asc';
  const trimmedSearch = search.trim();

  return useInfiniteQuery({
    queryKey: ['lps', sort, trimmedSearch],
    initialPageParam: undefined as number | undefined,
    queryFn: ({ pageParam }) =>
      getLpsListInfinite({ order, cursor: pageParam, search: trimmedSearch }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: trimmedSearch.length > 0,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
