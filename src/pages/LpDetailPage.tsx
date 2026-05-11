import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { getLpDetail, createComment } from '../apis/userApi';
import { useCommentsList } from '../hooks/useCommentsList';
import { LoadingSpinner, SkeletonGrid } from '../components/loading';

export function LpDetailPage() {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  const [commentOrder, setCommentOrder] = useState<'asc' | 'desc'>('desc');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const lpIdNumber = lpid ? Number(lpid) : 0;

  // LP 상세 정보
  const { data: lpDetail, isLoading, error, refetch } = useQuery({
    queryKey: ['lp', lpid],
    queryFn: () => getLpDetail(lpIdNumber),
    enabled: !!lpid,
  });

  // 댓글 목록
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCommentsList(lpIdNumber, commentOrder);

  const comments = commentsData?.pages.flatMap((page) => page.data) || [];

  // 무한 스크롤 트리거
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      await createComment({ lpId: lpIdNumber, content: commentText });
      setCommentText('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {/* 댓글 섹션 */}
          <div className="space-y-6 border-t border-neutral-800 pt-8">
            {/* 댓글 작성 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">댓글 작성</h3>
              <form onSubmit={handleCommentSubmit} className="space-y-3">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="댓글을 작성해주세요 (최소 1자)"
                  className="w-full px-4 py-3 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:border-pink-500 focus:outline-none resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-neutral-500">
                    {commentText.length}자
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting || !commentText.trim()}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-sm"
                  >
                    {isSubmitting ? '작성 중...' : '댓글 작성'}
                  </button>
                </div>
              </form>
            </div>

            {/* 댓글 목록 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  댓글
                </h3>
                <button
                  onClick={() => setCommentOrder(commentOrder === 'asc' ? 'desc' : 'asc')}
                  className="text-xs px-3 py-1 bg-neutral-800 text-neutral-300 rounded hover:bg-neutral-700 transition"
                >
                  {commentOrder === 'asc' ? '오래된순' : '최신순'}
                </button>
              </div>

              {/* 초기 로딩 */}
              {isCommentsLoading && comments.length === 0 && (
                <SkeletonGrid columns={1} count={3} />
              )}

              {/* 댓글 목록 */}
              {comments.map((comment: any) => (
                <div
                  key={comment.id}
                  className="p-4 bg-neutral-800 rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white text-sm">
                      {comment.author?.name || '익명'}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleDateString('ko-KR')
                        : '-'}
                    </p>
                  </div>
                  <p className="text-neutral-300 text-sm">{comment.content}</p>
                </div>
              ))}

              {/* 추가 로딩 */}
              {isFetchingNextPage && <SkeletonGrid columns={1} count={2} />}

              {/* 무한 스크롤 트리거 */}
              <div ref={observerTarget} className="h-10" />

              {/* 댓글 없음 */}
              {!isCommentsLoading && comments.length === 0 && (
                <p className="text-center text-neutral-500 py-8">
                  첫 번째 댓글을 작성해주세요!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
