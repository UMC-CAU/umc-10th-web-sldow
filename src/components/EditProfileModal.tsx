import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMe, uploadImage } from '../apis/userApi';
import { useAuth } from '../hooks/useAuth';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initial: {
    name: string;
    bio: string | null;
    avatar: string | null;
  };
}

export function EditProfileModal({ isOpen, onClose, initial }: EditProfileModalProps) {
  const queryClient = useQueryClient();
  const { authData, setAuthData } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initial.name);
  const [bio, setBio] = useState(initial.bio ?? '');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initial.avatar);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setName(initial.name);
      setBio(initial.bio ?? '');
      setAvatarUrl(initial.avatar);
      setPendingFile(null);
      setPreviewUrl(null);
      setErrorMessage(null);
    }
  }, [isOpen, initial]);

  useEffect(() => {
    if (!pendingFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(pendingFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [pendingFile]);

  const mutation = useMutation({
    mutationFn: async () => {
      let nextAvatar: string | undefined;
      if (pendingFile) {
        const { imageUrl } = await uploadImage(pendingFile);
        nextAvatar = imageUrl;
      } else if (avatarUrl === null && initial.avatar) {
        nextAvatar = '';
      }

      const payload: { name?: string; bio?: string; avatar?: string } = {};
      if (name.trim() && name.trim() !== initial.name) payload.name = name.trim();
      if (bio !== (initial.bio ?? '')) payload.bio = bio;
      if (nextAvatar !== undefined) payload.avatar = nextAvatar;

      return updateMe(payload);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      if (authData && data?.name && data.name !== authData.name) {
        setAuthData({ ...authData, name: data.name });
      }
      onClose();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message ?? '프로필 수정에 실패했습니다.';
      setErrorMessage(typeof msg === 'string' ? msg : '프로필 수정에 실패했습니다.');
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !mutation.isPending) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, mutation.isPending, onClose]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setPendingFile(selected);
  };

  const handleRemoveAvatar = () => {
    setPendingFile(null);
    setAvatarUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!name.trim()) {
      setErrorMessage('이름을 입력해주세요.');
      return;
    }
    mutation.mutate();
  };

  const displayAvatar = previewUrl ?? avatarUrl;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={() => !mutation.isPending && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-neutral-900 border border-neutral-700 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => !mutation.isPending && onClose()}
          aria-label="닫기"
          className="absolute top-3 right-3 text-neutral-400 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-800 transition"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <h2 className="text-xl font-bold text-white">프로필 수정</h2>

          {/* 아바타 */}
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative w-28 h-28 rounded-full bg-neutral-800 border-2 border-dashed border-neutral-600 hover:border-pink-500 transition overflow-hidden flex items-center justify-center"
            >
              {displayAvatar ? (
                <img
                  src={displayAvatar}
                  alt="프로필"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-neutral-400">
                  <span className="text-3xl leading-none">+</span>
                  <span className="text-xs mt-1">사진 추가</span>
                </div>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {displayAvatar && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="text-xs text-neutral-400 hover:text-white underline"
              >
                사진 제거
              </button>
            )}
          </div>

          {/* 이름 */}
          <div>
            <label className="block text-sm text-neutral-400 mb-1">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:border-pink-500 focus:outline-none transition"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Bio <span className="text-neutral-600">(선택)</span>
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="자기소개를 입력하세요"
              rows={3}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:border-pink-500 focus:outline-none transition resize-none"
            />
          </div>

          {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-900 disabled:cursor-not-allowed text-white rounded-lg transition font-medium"
          >
            {mutation.isPending ? '저장 중...' : '저장'}
          </button>
        </form>
      </div>
    </div>
  );
}
