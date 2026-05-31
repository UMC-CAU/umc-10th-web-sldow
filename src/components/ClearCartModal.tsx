import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { closeModal } from '../features/modal/modalSlice';
import type { AppDispatch } from '../store/store';

export const ClearCartModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={() => dispatch(closeModal())}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="clear-cart-title"
        className="w-full max-w-sm rounded-lg border border-border bg-card p-6 text-center shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="clear-cart-title" className="text-xl font-medium text-foreground">
          장바구니를 비우시겠습니까?
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          담긴 음반이 전부 삭제됩니다.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            className="rounded-md border border-border bg-card px-5 py-2 text-foreground transition-colors duration-200 hover:bg-muted"
          >
            아니요
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-md bg-destructive px-5 py-2 text-destructive-foreground transition-colors duration-200 hover:bg-destructive/90"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};
