import { useEffect, useState } from 'react';
import { getMyInfo } from '../apis/userApi';

export function HomePage() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const info = await getMyInfo();
        setUserInfo(info);
      } catch (err) {
        console.error('사용자 정보 조회 실패:', err);
        setError('사용자 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-2xl font-semibold text-pink-400">홈</h1>

      {loading && (
        <p className="mt-4 text-neutral-400">로딩 중...</p>
      )}

      {!loading && error && (
        <p className="mt-4 text-pink-400">{error}</p>
      )}

      {!loading && userInfo && (
        <div>
          <p className="mt-4 text-lg text-white">
            반갑습니다, <span className="font-semibold text-pink-400">{userInfo.name}</span>님!
          </p>
          <p className="mt-2 text-neutral-400">
            로그인이 완료되었습니다.
          </p>
        </div>
      )}

      {!loading && !userInfo && !error && (
        <p className="mt-4 text-neutral-400">사용자 정보가 없습니다.</p>
      )}
    </div>
  );
}
