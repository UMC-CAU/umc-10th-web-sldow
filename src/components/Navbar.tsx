import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

interface NavbarProps {
  onMenuClick?: () => void;
}

//NavLink의 active 스타일링 기능
const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-pink-500 font-medium"
    : "text-neutral-500 transition-colors hover:text-neutral-400";

export function Navbar({ onMenuClick }: NavbarProps) {
  const { authData, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMenuClick?.();
  };

  return (
    <nav className="bg-neutral-900 sticky top-0 z-50">
      <div className="flex items-center justify-between px-8 py-4">
        {/* 버거 버튼 */}
        <button
          onClick={handleMenuClick}
          className="p-2 hover:bg-neutral-800 rounded transition"
          aria-label="메뉴"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M7.95 11.95h32m-32 12h32m-32 12h32"
            />
          </svg>
        </button>


        <div className="flex items-center gap-4">
          {isLoggedIn && authData ? (
            <div className="flex items-center gap-4">
              <p className="text-white">
                <span className="font-semibold text-pink-400">{authData.name}</span>님 반갑습니다.
              </p>
              <button
                onClick={handleLogout}
                className="rounded-full px-4 py-2 text-sm font-semibold bg-pink-600 text-white hover:bg-pink-700 transition"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-pink-500 text-white"
                      : "bg-neutral-900 text-white ring-1 ring-pink-500 hover:bg-neutral-800"
                  }`
                }
              >
                회원가입
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-pink-500 text-white"
                      : "bg-pink-600 text-white hover:bg-pink-700"
                  }`
                }
              >
                로그인
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
