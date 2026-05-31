import { ShoppingCart } from 'lucide-react';
import { Header } from '../components/Header';
import { CartItem } from '../components/CartItem';
import { ClearCartModal } from '../components/ClearCartModal';
import { useCartStore } from '../store/useCartStore';
import { useModalStore } from '../store/useModalStore';

export const CartPage = () => {
  const { cartItems, amount, total, increase, decrease, removeItem } =
    useCartStore();
  const { isOpen, open } = useModalStore();

  return (
    <div className="min-h-screen bg-background">
      <Header amount={amount} />

      <div className="max-w-2xl mx-auto p-6">
        {cartItems.length > 0 ? (
          <>
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              {cartItems.map((item, index) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onDecrease={decrease}
                  onIncrease={increase}
                  onRemove={removeItem}
                  showBorder={index !== cartItems.length - 1}
                />
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="text-muted-foreground">총 수량</span>
                <span className="text-foreground">{amount}개</span>
              </div>
              <div className="flex items-center justify-between pt-4">
                <span className="text-muted-foreground">총 금액</span>
                <span className="text-lg text-foreground">
                  {total.toLocaleString('ko-KR')}원
                </span>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={open}
                className="rounded-lg border-2 border-primary bg-card px-8 py-3 text-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                전체 삭제
              </button>
            </div>
          </>
        ) : (
          <div className="rounded-lg border border-border bg-card py-16 text-center shadow-sm">
            <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">장바구니가 비어있습니다</p>
          </div>
        )}
      </div>

      {isOpen && <ClearCartModal />}
    </div>
  );
};
