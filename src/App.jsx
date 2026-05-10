import { useState } from 'react'
import MovieListPage from './pages/MovieListPage'
import InfiniteScrollPage from './pages/InfiniteScrollPage'
import SearchPage from './pages/SearchPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('movieList')

  const renderPage = () => {
    switch (currentPage) {
      case 'movieList':
        return <MovieListPage />
      case 'infiniteScroll':
        return <InfiniteScrollPage />
      case 'search':
        return <SearchPage />
      default:
        return <MovieListPage />
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🎬 TanStack Query 실습</h1>
        <nav className="nav">
          <button
            className={`nav-button ${currentPage === 'movieList' ? 'active' : ''}`}
            onClick={() => setCurrentPage('movieList')}
          >
            useQuery 기초
          </button>
          <button
            className={`nav-button ${currentPage === 'search' ? 'active' : ''}`}
            onClick={() => setCurrentPage('search')}
          >
            검색 예제
          </button>
          <button
            className={`nav-button ${currentPage === 'infiniteScroll' ? 'active' : ''}`}
            onClick={() => setCurrentPage('infiniteScroll')}
          >
            무한 스크롤
          </button>
        </nav>
      </header>

      <main className="main">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
