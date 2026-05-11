import { useNavigate } from 'react-router-dom';

interface GalleryItem {
  id: string | number;
  image: string;
  title: string;
  subtitle?: string;
  likes?: any[];
}

interface GalleryGridProps {
  items: GalleryItem[];
  columns?: number;
  onItemClick?: (item: GalleryItem) => void;
}

export function GalleryGrid({ items, columns = 5, onItemClick }: GalleryGridProps) {
  const navigate = useNavigate();

  const handleCardClick = (item: GalleryItem) => {
    onItemClick?.(item);
    navigate(`/lp/${item.id}`);
  };

  return (
    <div
      className={`grid gap-3`}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleCardClick(item)}
          className="group relative h-40 cursor-pointer overflow-hidden rounded-lg bg-neutral-800 transition-transform duration-300 hover:scale-105"
        >
          {/* 이미지 */}
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-neutral-700 flex items-center justify-center">
              <span className="text-neutral-500 text-sm">이미지 없음</span>
            </div>
          )}

          {/* 호버 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-3">
            <div />
            <div className="flex justify-between items-end">
              <div className="space-y-2 flex-1">
                <h3 className="text-white font-semibold text-sm line-clamp-2">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-neutral-300 text-xs line-clamp-1">
                    {item.subtitle}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 text-white text-sm whitespace-nowrap ml-2">
                ❤️ {item.likes?.length || 0}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
