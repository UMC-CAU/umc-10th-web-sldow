import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLp, updateLp, uploadImage } from '../apis/userApi';

interface LpInitial {
  id: number;
  title: string;
  content: string;
  thumbnail: string | null;
  tags: { id?: number; name: string }[] | string[];
}

interface CreateLpModalProps {
  isOpen: boolean;
  onClose: () => void;
  lp?: LpInitial | null; // 있으면 수정 모드, 없으면 생성 모드
}

function normalizeTags(tags: LpInitial['tags']): string[] {
  return tags.map((t) => (typeof t === 'string' ? t : t.name));
}

export function CreateLpModal({ isOpen, onClose, lp }: CreateLpModalProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditMode = !!lp;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [existingThumbnail, setExistingThumbnail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (lp) {
      setTitle(lp.title);
      setContent(lp.content);
      setTags(normalizeTags(lp.tags));
      setExistingThumbnail(lp.thumbnail);
    } else {
      setTitle('');
      setContent('');
      setTags([]);
      setExistingThumbnail(null);
    }
    setTagInput('');
    setFile(null);
    setPreviewUrl(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [isOpen, lp]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const mutation = useMutation({
    mutationFn: async () => {
      let thumbnail: string | undefined;
      if (file) {
        const { imageUrl } = await uploadImage(file);
        thumbnail = imageUrl;
      }

      if (isEditMode && lp) {
        const payload: Parameters<typeof updateLp>[0]['payload'] = {
          title: title.trim(),
          content: content.trim(),
          tags,
        };
        if (thumbnail !== undefined) payload.thumbnail = thumbnail;
        return updateLp({ lpId: lp.id, payload });
      }

      return createLp({
        title: title.trim(),
        content: content.trim(),
        thumbnail,
        tags,
        published: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      if (isEditMode && lp) {
        queryClient.invalidateQueries({ queryKey: ['lp', String(lp.id)] });
      }
      onClose();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message ?? 'LP 저장에 실패했습니다.';
      setErrorMessage(typeof msg === 'string' ? msg : 'LP 저장에 실패했습니다.');
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
    setFile(e.target.files?.[0] ?? null);
  };

  const handleAddTag = () => {
    const next = tagInput.trim();
    if (!next) return;
    if (tags.includes(next)) {
      setTagInput('');
      return;
    }
    setTags([...tags, next]);
    setTagInput('');
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (target: string) => {
    setTags(tags.filter((t) => t !== target));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!title.trim()) return setErrorMessage('제목을 입력해주세요.');
    if (!content.trim()) return setErrorMessage('내용을 입력해주세요.');
    if (tags.length === 0) return setErrorMessage('태그를 1개 이상 입력해주세요.');
    mutation.mutate();
  };

  const displayImage = previewUrl ?? existingThumbnail;

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
          <h2 className="text-xl font-bold text-white">
            {isEditMode ? 'LP 수정' : '새로운 LP 만들기'}
          </h2>

          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative w-32 h-32 rounded-full bg-neutral-800 border-2 border-dashed border-neutral-600 hover:border-pink-500 transition overflow-hidden flex items-center justify-center"
            >
              {displayImage ? (
                <img
                  src={displayImage}
                  alt="미리보기"
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
          </div>

          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="LP Title"
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:border-pink-500 focus:outline-none transition"
            />
          </div>

          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="LP Content"
              rows={3}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:border-pink-500 focus:outline-none transition resize-none"
            />
          </div>

          <div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="LP Tag"
                className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:border-pink-500 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 text-white rounded-lg transition text-sm"
              >
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-800 border border-neutral-700 rounded-md text-xs text-neutral-200"
                  >
                    #{t}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="text-neutral-500 hover:text-white"
                      aria-label={`${t} 제거`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-900 disabled:cursor-not-allowed text-white rounded-lg transition font-medium"
          >
            {mutation.isPending
              ? isEditMode
                ? '저장 중...'
                : '생성 중...'
              : isEditMode
              ? '저장'
              : 'Add LP'}
          </button>
        </form>
      </div>
    </div>
  );
}
