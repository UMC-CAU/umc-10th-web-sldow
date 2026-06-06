import { useParams, useNavigate } from 'react-router-dom';

export const MovieDetailPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-100 p-6">
      <h1 className="text-2xl font-bold text-neutral-900">영화 상세 페이지</h1>
      <p className="text-neutral-600">
        movieId: <span className="font-mono font-semibold">{movieId}</span>
      </p>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
      >
        뒤로 가기
      </button>
    </div>
  );
};
