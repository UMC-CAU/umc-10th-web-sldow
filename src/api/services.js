// API 서비스 함수들
// 각 API 엔드포인트를 호출하는 함수들을 정의합니다.
// useQuery의 queryFn으로 사용될 함수들입니다.

import { apiClient } from './client'

// 영화 목록 조회 (pagination 지원)
export const fetchMovies = async ({ page = 1, limit = 10 }) => {
  return apiClient.get(`/movie/popular?page=${page}`)
}

// 단일 영화 상세 정보 조회
export const fetchMovieDetail = async (movieId) => {
  if (!movieId) throw new Error('Movie ID is required')
  return apiClient.get(`/movie/${movieId}`)
}

// 사용자 정보 조회
export const fetchUser = async (userId) => {
  if (!userId) throw new Error('User ID is required')
  return apiClient.get(`/user/${userId}`)
}

// 검색 (queryFn에서 keyword를 받아 API에 전달)
export const searchMovies = async (keyword) => {
  if (!keyword) throw new Error('Keyword is required')
  return apiClient.get(`/search/movie?query=${encodeURIComponent(keyword)}`)
}

// Infinite Query를 위한 페이지네이션 함수
// pageParam은 TanStack Query에서 자동으로 관리됩니다
export const fetchMoviesInfinite = async ({ pageParam = 1 }) => {
  const data = await apiClient.get(`/movie/popular?page=${pageParam}`)
  return {
    ...data,
    nextPage: pageParam + 1,
    hasMore: data.results && data.results.length > 0,
  }
}
