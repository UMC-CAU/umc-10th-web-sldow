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
      className={`h-10 w-10 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent ${className}`}
      role="status"
      aria-label={label}
    />
  );
}
