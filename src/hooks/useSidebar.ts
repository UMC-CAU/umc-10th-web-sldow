import { useCallback, useEffect, useState } from 'react';

export function useSidebar(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // ESC 키로 닫기: 열려있을 때만 리스너 등록, cleanup으로 해제
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // 배경 스크롤 방지: 열려있는 동안 body의 overflow를 hidden으로 잠금
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow; //복원용
    document.body.style.overflow = 'hidden'; //페이지 전체 스크롤 비활성화

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return { isOpen, open, close, toggle };
}
