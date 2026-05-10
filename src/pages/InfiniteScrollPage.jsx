import { useEffect, useRef } from 'react'
import { useMoviesInfinite } from '../hooks/useMovies'
import './InfiniteScrollPage.css'

function InfiniteScrollPage() {
  const observerTarget = useRef(null)

  // TODO: useInfiniteQuery Hook 사용
  // - data: 모든 페이지의 데이터를 포함하는 객체
  // - data.pages: 각 페이지 데이터의 배열 ([page1, page2, page3, ...])
  // - data.pageParams: 각 페이지의 pageParam 배열
  // - hasNextPage: 다음 페이지가 있는지 여부
  // - isFetchingNextPage: 다음 페이지를 로드 중인지
  // - fetchNextPage: 다음 페이지를 로드하는 함수
  // - status: 'pending' | 'error' | 'success' 중 하나
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, status } = useMoviesInfinite()

  // TODO: Intersection Observer를 사용하여 마지막 요소가 보일 때 자동으로 다음 페이지 로드
  // useEffect에서:
  // 1. new IntersectionObserver 생성
  // 2. observerTarget.current를 observe
  // 3. 교집합이 생기면 fetchNextPage() 호출
  useEffect(() => {
    if (!observerTarget.current) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(observerTarget.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage])

  // 모든 페이지의 결과를 flat하여 하나의 배열로
  // TODO: data?.pages.flatMap(page => page.results || [])
  const allResults = data?.pages.flatMap(page => page.results || []) || []

  return (
    <div className="infinite-scroll-page">
      <h2>무한 스크롤 (useInfiniteQuery)</h2>

      {/* 초기 로딩 */}
      {status === 'pending' && (
        <div className="loading">초기 데이터를 로드 중입니다...</div>
      )}

      {/* 에러 */}
      {status === 'error' && (
        <div className="error">데이터 로드 중 오류가 발생했습니다</div>
      )}

      {/* 성공 */}
      {status === 'success' && (
        <>
          <div className="info-box">
            <p>총 {allResults.length}개 항목 로드됨</p>
          </div>

          {/* 영화 그리드 */}
          <div className="movie-grid infinite">
            {allResults.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="movie-poster">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    '포스터 없음'
                  )}
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}</p>
                </div>
              </div>
            ))}
            {allResults.length === 0 && (
              <div className="placeholder-message">
                영화 데이터가 표시될 위치입니다.
              </div>
            )}
          </div>

          {/* 스크롤 감지 대상 */}
          <div ref={observerTarget} className="observer-target">
            {isFetchingNextPage ? (
              <div className="loading-more">더 많은 항목을 로드 중...</div>
            ) : hasNextPage ? (
              <div className="loading-more">아래로 스크롤하여 더 많은 항목을 로드하세요</div>
            ) : (
              <div className="end-message">모든 항목을 로드했습니다</div>
            )}
          </div>
        </>
      )}

      {/* 학습 포인트 */}
      <div className="learning-points">
        <h3>학습 포인트</h3>
        <ul>
          <li><strong>useInfiniteQuery:</strong> 페이지별 데이터를 자동으로 관리하는 Hook</li>
          <li><strong>data.pages:</strong> 각 페이지의 데이터 배열</li>
          <li><strong>getNextPageParam:</strong> 다음 페이지 파라미터를 결정하는 함수</li>
          <li><strong>hasNextPage:</strong> 다음 페이지의 존재 여부</li>
          <li><strong>fetchNextPage:</strong> 다음 페이지 데이터를 로드하는 함수</li>
          <li><strong>Intersection Observer:</strong> 마지막 요소가 화면에 보일 때 감지</li>
        </ul>
      </div>
    </div>
  )
}

export default InfiniteScrollPage
