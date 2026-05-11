import { useInfiniteQuery } from '@tanstack/react-query';
import { getLpsListInfinite } from '../apis/userApi';

export function useLpsList(sort: 'latest' | 'oldest' = 'latest') {
  const order = sort === 'latest' ? 'desc' : 'asc';

  return useInfiniteQuery({
    queryKey: ['lps', sort],
    queryFn: ({ pageParam = undefined }) =>
      getLpsListInfinite({ order, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
