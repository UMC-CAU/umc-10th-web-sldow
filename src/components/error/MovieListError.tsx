export type MovieListErrorProps = {
  message: string;
};

export function MovieListError({ message }: MovieListErrorProps) {
  return (
    <div
      role="alert"
      className="flex min-h-[40vh] flex-col items-center justify-center gap-2 px-4 text-center"
    >
      <p className="text-lg font-medium text-red-600">
        영화 정보를 불러오지 못했습니다.
      </p>
      <p className="max-w-md text-sm text-neutral-600">
        네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요.
      </p>
      <p className="text-xs text-neutral-400">({message})</p>
    </div>
  );
}
