import { useInfiniteQuery } from '@tanstack/react-query';
import { getCommentsList } from '../apis/userApi';

export function useCommentsList(
  lpId: number,
  order: 'asc' | 'desc' = 'desc'
) {
  return useInfiniteQuery({
    queryKey: ['lpComments', lpId, order],
    initialPageParam: undefined as number | undefined,
    queryFn: ({ pageParam }) =>
      getCommentsList({ lpId, order, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
