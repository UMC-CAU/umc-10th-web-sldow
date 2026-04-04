import { LoadingSpinner } from "./LoadingSpinner";

/** 목록 영역 중앙 로딩 (네비·페이지네이션 아래 `Outlet` 안에서 사용) */
export function MovieListLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
