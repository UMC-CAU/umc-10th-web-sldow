import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { fetchMovies, fetchMovieDetail, fetchMoviesInfinite } from '../api/services'

// 영화 목록을 가져오는 Hook
// useQuery의 기본 사용법을 배우는 실습에 사용합니다
export const useMovies = (page = 1, limit = 10) => {
  return useQuery({
    // queryKey: 캐싱을 위한 고유한 식별자 배열
    // 배열의 요소가 변경되면 자동으로 새로운 쿼리로 취급되어 데이터를 다시 요청합니다
    queryKey: ['movies', { page, limit }],

    // queryFn: 실제 데이터를 가져오는 함수
    // async 함수여야 하며, Promise를 반환해야 합니다
    queryFn: () => fetchMovies({ page, limit }),

    // staleTime: 데이터가 최신이라고 간주되는 시간 (ms)
    // 이 시간 동안은 캐시된 데이터를 사용하고 다시 요청하지 않습니다
    staleTime: 1000 * 60 * 5, // 5분

    // gcTime: 데이터를 메모리에 보관하는 시간 (이전 버전의 cacheTime)
    // 이 시간이 지나면 메모리에서 제거됩니다
    gcTime: 1000 * 60 * 10, // 10분

    // retry: 요청 실패 시 재시도 횟수
    retry: 3,

    // retryDelay: 재시도 전 대기 시간 (ms)
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

// 영화 상세 정보를 가져오는 Hook
// queryKey가 동적으로 변경될 때의 동작을 배우는 실습에 사용합니다
export const useMovieDetail = (movieId) => {
  return useQuery({
    // movieId가 null이나 undefined이면 쿼리를 비활성화합니다
    // enabled 옵션: true일 때만 queryFn을 실행합니다
    enabled: !!movieId,

    queryKey: ['movie', movieId],

    queryFn: () => fetchMovieDetail(movieId),

    staleTime: 1000 * 60 * 10, // 10분
  })
}

// 무한 스크롤링을 위한 Hook
// Infinite Query를 배우는 실습에 사용합니다
export const useMoviesInfinite = () => {
  return useInfiniteQuery({
    queryKey: ['moviesInfinite'],

    queryFn: fetchMoviesInfinite,

    // initialPageParam: 첫 번째 페이지 파라미터
    initialPageParam: 1,

    // getNextPageParam: 다음 페이지 파라미터를 결정하는 함수
    // lastPage: 마지막으로 받은 데이터
    // pages: 지금까지 받은 모든 페이지 데이터 배열
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage : null
    },
  })
}
