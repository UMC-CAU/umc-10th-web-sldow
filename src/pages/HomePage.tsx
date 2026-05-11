import { useState, useEffect, useRef } from "react";
import { GalleryGrid } from "../components/GalleryGrid";
import { useLpsList } from "../hooks/useLpsList";
import { SkeletonGrid } from "../components/loading";

export function HomePage() {
  const [sort, setSort] = useState<"latest" | "oldest">("latest");
  const observerTarget = useRef<HTMLDivElement>(null);

  // useInfiniteQuery로 lps 목록 조회
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useLpsList(sort);

  // API 데이터를 GalleryGrid 형식으로 변환
  const galleryItems = data?.pages.flatMap((page) =>
    page.data.map((item: any) => ({
      id: item.id,
      image: item.thumbnail || "",
      title: item.title || item.name,
      subtitle: item.subtitle || item.description,
      likes: item.likes || [],
    }))
  ) || [];

  // Intersection Observer로 무한 스크롤 구현
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

  const handleGalleryItemClick = (item: any) => {
    console.log("클릭된 아이템:", item);
  };

  const toggleSort = () => {
    setSort(sort === "latest" ? "oldest" : "latest");
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-black">
      {/* 정렬 버튼 */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={toggleSort}
          disabled={isLoading}
          className="px-4 py-2 rounded-full text-sm font-semibold bg-pink-600 text-white hover:bg-pink-700 disabled:opacity-50 transition"
        >
          {sort === "latest" ? "최신순" : "오래된순"}
        </button>
        {(isLoading || isFetchingNextPage) && (
          <span className="text-neutral-400 text-sm flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
            {isLoading ? "로딩 중..." : "추가 로딩 중..."}
          </span>
        )}
      </div>

      {/* 에러 상태 */}
      {error && (
        <div className="mb-8 p-4 bg-red-900/20 border border-red-500 rounded-lg">
          <h3 className="text-red-400 font-semibold mb-2">오류 발생</h3>
          <p className="text-red-300 text-sm mb-4">데이터를 불러올 수 없습니다.</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm font-medium"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* 초기 로딩 - 스켈레톤 그리드 */}
      {isLoading && galleryItems.length === 0 && !error && (
        <div>
          <SkeletonGrid columns={5} count={10} />
        </div>
      )}

      {/* 갤러리 그리드 */}
      {galleryItems.length > 0 && (
        <>
          <GalleryGrid
            items={galleryItems}
            columns={5}
            onItemClick={handleGalleryItemClick}
          />

          {/* 추가 로딩 - 하단 스켈레톤 */}
          {isFetchingNextPage && (
            <div className="mt-8">
              <SkeletonGrid columns={5} count={5} />
            </div>
          )}

          {/* 무한 스크롤 트리거 */}
          <div ref={observerTarget} className="h-10 mt-8" />
        </>
      )}

      {/* 데이터 없음 */}
      {!isLoading && galleryItems.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-4xl mb-4">🎵</div>
          <p className="text-neutral-400 text-lg">데이터가 없습니다.</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition text-sm"
          >
            새로고침
          </button>
        </div>
      )}
    </div>
  );
}
