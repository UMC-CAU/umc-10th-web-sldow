import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '../api/services'
import './SearchPage.css'

function SearchPage() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  // TODO: enabled 옵션을 사용하여 검색어가 있을 때만 쿼리를 실행하세요
  // 마지막 두 매개변수: enabled는 !!searchKeyword (검색어가 존재할 때)
  // queryKey에 searchKeyword를 포함하여 검색어가 바뀌면 새로운 데이터를 요청하도록 하세요

  const { data: searchResults, isLoading, error } = useQuery({
    enabled: !!searchKeyword,
    queryKey: ['search', searchKeyword],
    queryFn: () => searchMovies(searchKeyword),
  })

  const handleSearch = (e) => {
    e.preventDefault()
    setHasSearched(true)
  }

  const handleClear = () => {
    setSearchKeyword('')
    setHasSearched(false)
  }

  return (
    <div className="search-page">
      <h2>영화 검색 (동적 queryKey)</h2>

      {/* 검색 폼 */}
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="영화 제목을 입력하세요..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="button">
          검색
        </button>
        {searchKeyword && (
          <button
            type="button"
            className="button button-secondary"
            onClick={handleClear}
          >
            초기화
          </button>
        )}
      </form>

      {/* 로딩 상태 */}
      {isLoading && hasSearched && (
        <div className="loading">검색 결과를 로드 중입니다...</div>
      )}

      {/* 에러 상태 */}
      {error && hasSearched && (
        <div className="error">검색 실패: {error.message}</div>
      )}

      {/* 검색 결과 */}
      {hasSearched && searchResults && !isLoading && (
        <>
          <div className="results-header">
            <p className="result-count">
              검색 결과: {searchResults?.results?.length || 0}개
            </p>
          </div>

          {searchResults?.results?.length === 0 ? (
            <div className="no-results">
              검색 결과가 없습니다. 다른 검색어를 시도해보세요.
            </div>
          ) : (
            <div className="results-list">
              {searchResults?.results?.map((movie) => (
                <div key={movie.id} className="result-item">
                  <div className="result-poster">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      '포스터 없음'
                    )}
                  </div>
                  <div className="result-content">
                    <h3 className="result-title">{movie.title}</h3>
                    <p className="result-description">{movie.overview}</p>
                    <p className="result-meta">
                      ⭐ {movie.vote_average?.toFixed(1)} • {new Date(movie.release_date).getFullYear()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* 초기 상태 메시지 */}
      {!hasSearched && (
        <div className="empty-state">
          <p>검색어를 입력하고 검색 버튼을 클릭하세요</p>
        </div>
      )}

      {/* 학습 포인트 */}
      <div className="learning-points">
        <h3>학습 포인트</h3>
        <ul>
          <li><strong>enabled:</strong> 특정 조건을 만족할 때만 쿼리를 실행</li>
          <li><strong>동적 queryKey:</strong> searchKeyword가 바뀌면 새로운 쿼리로 취급</li>
          <li><strong>자동 캐싱:</strong> 같은 검색어로 다시 검색하면 캐시된 데이터 사용</li>
          <li><strong>상태 분리:</strong> isLoading은 처음 로드만, isFetching은 재요청도 포함</li>
        </ul>
      </div>
    </div>
  )
}

export default SearchPage
