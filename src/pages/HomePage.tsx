import { useEffect, useState } from 'react';
import { getMyInfo } from '../apis/userApi';

export function HomePage() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const info = await getMyInfo();
        setUserInfo(info);
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-neutral-800">홈</h1>
      {loading ? (
        <p className="mt-4 text-neutral-500">로딩 중...</p>
      ) : userInfo ? (
        <p className="mt-4 text-lg text-neutral-700">
          반갑습니다, <span className="font-semibold">{userInfo.name}</span>님!
        </p>
      ) : null}
      <p className="mt-2 text-neutral-500">
        상단 메뉴에서 원하는 영화 목록으로 이동할 수 있습니다.
      </p>
    </div>
  );
}
