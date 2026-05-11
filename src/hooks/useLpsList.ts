import { useQuery } from '@tanstack/react-query';
import { getLpsList } from '../apis/userApi';

export function useLpsList(sort: 'latest' | 'oldest' = 'latest') {
  return useQuery({
    queryKey: ['lps', sort],
    queryFn: () => getLpsList(sort),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
