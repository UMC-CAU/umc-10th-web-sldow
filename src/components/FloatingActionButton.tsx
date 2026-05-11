import { useNavigate } from 'react-router-dom';

export function FloatingActionButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/create')}
      className="fixed bottom-8 right-8 z-30 w-14 h-14 rounded-full bg-pink-600 hover:bg-pink-700 text-white shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center text-2xl"
      aria-label="새로 만들기"
    >
      +
    </button>
  );
}
