import { Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { HomePage } from "./pages/HomePage";
import { MoviesPage } from "./pages/MoviesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="popular" element={<MoviesPage category="popular" />} />
        <Route
          path="now-playing"
          element={<MoviesPage category="now_playing" />}
        />
        <Route
          path="top-rated"
          element={<MoviesPage category="top_rated" />}
        />
        <Route path="upcoming" element={<MoviesPage category="upcoming" />} />
      </Route>
    </Routes>
  );
}

export default App;
