import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getMyInfo } from '../apis/userApi';
import { EditProfileModal } from '../components/EditProfileModal';
import { LoadingSpinner } from '../components/loading';

export function MyPage() {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['me'],
    queryFn: getMyInfo,
  });

  if (isLoading) {
    return (
      <div className="p-8 min-h-screen bg-black flex flex-col items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 min-h-screen bg-black text-white">
        <p className="text-red-400">사용자 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-black">
      <div className="max-w-xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">마이페이지</h1>
          <button
            onClick={() => setIsEditOpen(true)}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm transition"
          >
            ⚙ 설정
          </button>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-neutral-800 overflow-hidden flex items-center justify-center">
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl text-neutral-500">
                  {data.name?.[0] ?? '?'}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{data.name}</h2>
              <p className="text-sm text-neutral-400">{data.email}</p>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-4">
            <p className="text-sm text-neutral-500 mb-1">Bio</p>
            <p className="text-neutral-200 whitespace-pre-wrap">
              {data.bio || <span className="text-neutral-600">소개가 없습니다.</span>}
            </p>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initial={{
          name: data.name ?? '',
          bio: data.bio ?? null,
          avatar: data.avatar ?? null,
        }}
      />
    </div>
  );
}
