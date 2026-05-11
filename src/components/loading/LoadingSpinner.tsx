export type LoadingSpinnerProps = {
  /** 접근성용 라벨 */
  label?: string;
  className?: string;
};

export function LoadingSpinner({
  label = "로딩중",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`h-10 w-10 animate-spin rounded-full border-2 border-pink-500 border-t-transparent ${className}`}
      role="status"
      aria-label={label}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="group relative h-40 cursor-pointer overflow-hidden rounded-lg bg-neutral-800 animate-pulse">
      <div className="h-full w-full bg-neutral-700" />
    </div>
  );
}

export function SkeletonGrid({ columns = 5, count = 10 }: { columns?: number; count?: number }) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
