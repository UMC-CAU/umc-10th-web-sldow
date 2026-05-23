import SearchIcon from "../assets/search.svg";
import XCloseIcon from "../assets/x-close.svg";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <img src={SearchIcon} className="h-[18px] w-[18px]" />
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="검색하기"
        className="w-full rounded-full bg-neutral-900 text-white placeholder-neutral-500 pl-10 pr-10 py-2 text-sm ring-1 ring-neutral-700 focus:ring-pink-500 focus:outline-none transition"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 flex items-center pr-3 transition"
        >
          <img src={XCloseIcon} className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
