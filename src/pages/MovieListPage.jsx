import { useState } from 'react'
import { useMovies } from '../hooks/useMovies'
import './MovieListPage.css'

function MovieListPage() {
  const [page, setPage] = useState(1)

  // useQuery Hook을 사용하여 영화 데이터 가져오기
  // data: API로부터 받은 실제 데이터
  // isLoading: 처음 데이터를 가져오는 중인 상태
  // isFetching: 재요청 중인 상태 (캐시된 데이터가 있어도 true가 될 수 있음)
  // error: 요청 중 발생한 에러
  // status: 'pending' | 'error' | 'success' 중 하나
  // isPending: 데이터가 아직 없는 상태
  const { data, isLoading, isFetching, error, status } = useMovies(page, 10)

  // TODO: isLoading 또는 isPending을 사용하여 로딩 상태를 표시하세요
  // 화면에 로딩 UI를 보여주면 좋습니다

  // TODO: error가 있으면 에러 메시지를 표시하세요
  // error.message를 사용할 수 있습니다

  // TODO: data?.results 배열을 순회하며 영화 카드를 렌더링하세요
  // 각 영화는 제목, 포스터, 평점 등을 표시합니다

  // TODO: 페이지네이션 버튼을 만들고, 이전/다음 페이지로 이동하세요
  // page 상태가 변경되면 자동으로 새로운 데이터를 가져옵니다

  return (
    <div className="movie-list-page">
      <h2>영화 목록 (useQuery 기초)</h2>

      {/* 로딩 상태 표시 */}
      {isLoading && <div className="loading">데이터를 로딩 중입니다...</div>}

      {/* 에러 상태 표시 */}
      {error && <div className="error">에러 발생: {error.message}</div>}

      {/* 성공 상태 - 데이터 표시 */}
      {status === 'success' && (
        <>
          <div className="status-info">
            <p className="fetch-status">
              {isFetching ? '🔄 데이터 갱신 중...' : '✓ 데이터 로드 완료'}
            </p>
            <p className="page-info">현재 페이지: {page}</p>
          </div>

          {/* 영화 그리드 표시 */}
          <div className="movie-grid">
            {data?.results?.map((movie) => (
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
          </div>

          {/* 페이지네이션 */}
          <div className="pagination">
            <button
              className="button"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              이전
            </button>
            <span className="page-number">{page}</span>
            <button
              className="button"
              onClick={() => setPage(p => p + 1)}
            >
              다음
            </button>
          </div>
        </>
      )}

      {/* 학습 포인트 */}
      <div className="learning-points">
        <h3>학습 포인트</h3>
        <ul>
          <li><strong>queryKey:</strong> 캐시의 고유 식별자 역할 (배열 형태)</li>
          <li><strong>queryFn:</strong> 데이터를 가져오는 비동기 함수</li>
          <li><strong>staleTime:</strong> 데이터가 신선하다고 간주되는 시간</li>
          <li><strong>status:</strong> 'pending' | 'error' | 'success' 중 하나</li>
          <li><strong>isFetching:</strong> 재요청 중일 때 true (배경에서 동기화)</li>
        </ul>
      </div>
    </div>
  )
}

export default MovieListPage
