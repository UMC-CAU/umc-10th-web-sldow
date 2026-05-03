import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function GoogleCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuthData } = useAuth();

  useEffect(() => {
    const userId = searchParams.get('userId');
    const name = searchParams.get('name');
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (userId && name && accessToken && refreshToken) {
      setAuthData({
        id: parseInt(userId),
        name,
        accessToken,
        refreshToken,
      });
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>로그인 처리 중...</p>
    </div>
  );
}
