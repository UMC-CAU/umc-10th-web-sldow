import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../apis/axiosInstance';
import { LoadingSpinner } from '../components/loading';

async function getLpDetail(lpId: string | number) {
  const response = await axiosInstance.get(`/v1/lps/${lpId}`);
  return response.data.data;
}

export function LpDetailPage() {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  const { data: lpDetail, isLoading, error, refetch } = useQuery({
    queryKey: ['lp', lpid],
    queryFn: () => getLpDetail(lpid!),
    enabled: !!lpid,
  });

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 min-h-screen bg-black flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="mt-4 text-neutral-400">항목을 로드 중입니다...</p>
      </div>
    );
  }

  if (error || !lpDetail) {
    return (
      <div className="p-4 md:p-8 min-h-screen bg-black">
        <button
          onClick={() => navigate('/')}
          className="text-neutral-400 hover:text-neutral-300 transition mb-6"
        >
          ← 돌아가기
        </button>
        <div className="max-w-2xl mx-auto bg-red-900/20 border border-red-500 rounded-lg p-8">
          <h2 className="text-red-400 font-semibold mb-2 text-lg">오류 발생</h2>
          <p className="text-red-300 text-sm mb-4">항목을 찾을 수 없습니다.</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* 헤더 */}
      <div className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-sm p-4 flex items-center border-b border-neutral-800">
        <button
          onClick={() => navigate('/')}
          className="text-neutral-400 hover:text-neutral-300 transition font-medium"
        >
          ← 돌아가기
        </button>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 썸네일 */}
          <div className="rounded-lg overflow-hidden bg-neutral-800 aspect-video">
            {lpDetail.thumbnail ? (
              <img
                src={lpDetail.thumbnail}
                alt={lpDetail.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
                <span className="text-neutral-500">이미지 없음</span>
              </div>
            )}
          </div>

          {/* 제목 섹션 */}
          <div className="space-y-3 border-b border-neutral-800 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {lpDetail.title || lpDetail.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
              <span>📅 {lpDetail.createdAt ? new Date(lpDetail.createdAt).toLocaleDateString('ko-KR') : '-'}</span>
              <span>❤️ {lpDetail.likes?.length || 0}명이 좋아합니다</span>
            </div>
          </div>

          {/* 본문 섹션 */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">본문</h2>
            <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
              {lpDetail.content || '본문이 없습니다.'}
            </p>
          </div>

          {/* 액션 버튼 */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-neutral-800">
            <button className="px-4 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-medium text-sm">
              ❤️ 좋아요
            </button>
            <button className="px-4 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition font-medium text-sm">
              ✏️ 수정
            </button>
            <button className="px-4 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition font-medium text-sm">
              🗑️ 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
