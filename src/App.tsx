import { Routes, Route } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
import { MovieDetailPage } from './pages/MovieDetailPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/movies/:movieId" element={<MovieDetailPage />} />
    </Routes>
  );
}
