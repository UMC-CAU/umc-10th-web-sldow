import type { Dispatch, SetStateAction } from "react";

type PaginationProps = {
  page: number;
  totalPages: number;
  //React의 상태 변경 함수 타입은 이렇게 정의함
  setPage: Dispatch<SetStateAction<number>>;
};

export function Pagination({ page, totalPages, setPage }: PaginationProps) {
  return (
    <div className="mb-6 flex items-center justify-center gap-6">
      <button
        type="button"
        aria-label="이전 페이지"
        disabled={page <= 1}
        onClick={() => setPage((p) => p - 1)}
        className="rounded-md border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-neutral-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        &lt;
      </button>
      <span className="min-w-[5rem] text-center text-neutral-700">
        {page} 페이지
      </span>
      <button
        type="button"
        aria-label="다음 페이지"
        disabled={page >= totalPages}
        onClick={() => setPage((p) => p + 1)}
        className="rounded-md border border-fuchsia-300 bg-fuchsia-100 px-3 py-1.5 text-fuchsia-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        &gt;
      </button>
    </div>
  );
}
