interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmDisabled?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = '예',
  cancelLabel = '아니오',
  confirmDisabled = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 max-w-sm w-full space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          {message && (
            <p className="text-sm text-neutral-400 mt-2">{message}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium transition"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={confirmDisabled}
            className="flex-1 px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-900 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
