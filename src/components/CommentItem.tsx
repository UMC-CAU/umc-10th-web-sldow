import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment, updateComment } from '../apis/userApi';

interface CommentItemProps {
  comment: {
    id: number;
    content: string;
    authorId: number;
    createdAt?: string;
    author?: { id: number; name: string };
  };
  lpId: number;
  currentUserId?: number;
}

export function CommentItem({ comment, lpId, currentUserId }: CommentItemProps) {
  const queryClient = useQueryClient();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(comment.content);
  const menuRef = useRef<HTMLDivElement>(null);

  const isMine =
    currentUserId !== undefined &&
    (comment.author?.id === currentUserId || comment.authorId === currentUserId);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  const updateMutation = useMutation({
    mutationFn: (content: string) =>
      updateComment({ lpId, commentId: comment.id, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteComment({ lpId, commentId: comment.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] });
    },
  });

  const handleEditClick = () => {
    setDraft(comment.content);
    setIsEditing(true);
    setMenuOpen(false);
  };

  const handleSave = () => {
    const next = draft.trim();
    if (!next || next === comment.content) {
      setIsEditing(false);
      return;
    }
    updateMutation.mutate(next);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDraft(comment.content);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className="p-4 bg-neutral-800 rounded-lg space-y-2 relative">
      <div className="flex items-center justify-between">
        <p className="font-medium text-white text-sm">
          {comment.author?.name || '익명'}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-xs text-neutral-500">
            {comment.createdAt
              ? new Date(comment.createdAt).toLocaleDateString('ko-KR')
              : '-'}
          </p>
          {isMine && !isEditing && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="메뉴 열기"
                className="text-neutral-400 hover:text-white w-7 h-7 rounded hover:bg-neutral-700 flex items-center justify-center"
              >
                ⋯
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-1 w-24 bg-neutral-900 border border-neutral-700 rounded-md shadow-lg z-10 overflow-hidden">
                  <button
                    onClick={handleEditClick}
                    className="block w-full text-left px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-800"
                  >
                    수정
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-neutral-800 disabled:opacity-50"
                  >
                    {deleteMutation.isPending ? '삭제 중...' : '삭제'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 bg-neutral-900 text-white rounded border border-neutral-700 focus:border-pink-500 focus:outline-none resize-none text-sm"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              disabled={updateMutation.isPending}
              className="px-3 py-1 text-xs bg-neutral-700 hover:bg-neutral-600 text-white rounded disabled:opacity-50"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={updateMutation.isPending || !draft.trim()}
              className="px-3 py-1 text-xs bg-pink-600 hover:bg-pink-700 text-white rounded disabled:opacity-50"
            >
              {updateMutation.isPending ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-neutral-300 text-sm whitespace-pre-wrap">
          {comment.content}
        </p>
      )}
    </div>
  );
}
