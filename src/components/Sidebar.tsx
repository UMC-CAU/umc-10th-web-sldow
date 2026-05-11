import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-pink-500 font-medium text-lg'
      : 'text-neutral-400 transition-colors hover:text-neutral-300 text-lg';

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* 오버레이 (모바일) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-neutral-900 transform transition-transform duration-300 pt-16 md:relative md:top-0 md:h-[calc(100vh-64px)] md:translate-x-0 md:pt-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-6">
          <ul>
            <li>
              <NavLink
                to="/"
                className={navClass}
                onClick={handleNavClick}
              >
                홈
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
