import { useState, useRef } from "react";
import DefaultUserIcon from "../../assets/user-solid-full.svg";

type ProfileImageSelectorProps = {
  onFileSelect?: (file: File | undefined) => void;
};

/**
 * ProfileImageSelector Component
 *
 * Allows users to select and preview a profile image.
 * Uses a default user icon if no image is selected.
 */
export function ProfileImageSelector({ onFileSelect }: ProfileImageSelectorProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onFileSelect?.(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        onClick={triggerFileInput}
        className="group relative h-32 w-32 cursor-pointer overflow-hidden rounded-full bg-neutral-200 transition-all hover:bg-neutral-300 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2"
        role="button"
        aria-label="프로필 사진 선택"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            triggerFileInput();
          }
        }}
      >
        {preview ? (
          <img 
            src={preview} 
            alt="프로필 미리보기" 
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <img 
              src={DefaultUserIcon} 
              alt="기본 프로필 아이콘" 
              className="h-20 w-20"
            />
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            변경
          </span>
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
        aria-hidden="true"
      />
      
      <p className="mt-2 text-xs text-neutral-500">
        프로필 사진을 클릭하여 변경하세요
      </p>
    </div>
  );
}
