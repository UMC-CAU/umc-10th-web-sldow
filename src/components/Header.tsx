import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  amount: number;
}

export const Header = ({ amount }: HeaderProps) => {
  return (
    <header className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between shadow-sm">
      <h1 className="text-2xl font-medium leading-normal">Ohtani Ahn</h1>
      <div className="flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" aria-hidden="true" />
        <span className="min-w-6 rounded-full bg-primary-foreground px-2 py-0.5 text-center text-sm text-primary">
          {amount}
        </span>
      </div>
    </header>
  );
};
