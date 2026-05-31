import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onDecrease: (id: string) => void;
  onIncrease: (id: string) => void;
  onRemove: (id: string) => void;
  showBorder: boolean;
}

export const CartItem = ({
  item,
  onDecrease,
  onIncrease,
  onRemove,
  showBorder,
}: CartItemProps) => {
  return (
    <div
      className={`grid grid-cols-[4rem_minmax(0,1fr)_auto] items-center gap-4 p-4 ${
        showBorder ? 'border-b border-border' : ''
      }`}
    >
      <img
        src={item.img}
        alt={item.title}
        className="w-16 h-16 rounded-md object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3 className="truncate text-lg font-medium leading-normal">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground truncate mt-0.5">{item.singer}</p>
        <p className="text-foreground mt-2">
          {Number(item.price).toLocaleString('ko-KR')}원
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onDecrease(item.id)}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-accent-foreground transition-colors duration-200 hover:bg-accent"
          aria-label={`${item.title} 수량 감소`}
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="flex h-9 min-w-11 items-center justify-center rounded-md border border-border bg-card px-3 text-sm text-foreground">
          {item.amount}
        </span>
        <button
          type="button"
          onClick={() => onIncrease(item.id)}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-accent-foreground transition-colors duration-200 hover:bg-accent"
          aria-label={`${item.title} 수량 증가`}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-destructive transition-colors duration-200 hover:bg-destructive hover:text-destructive-foreground"
          aria-label={`${item.title} 삭제`}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
