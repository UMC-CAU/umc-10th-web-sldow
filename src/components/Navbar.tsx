import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

//NavLink의 active 스타일링 기능
const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-pink-500 font-medium"
    : "text-neutral-500 transition-colors hover:text-neutral-400";

export function Navbar() {
  const { authData, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-neutral-900 px-4 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <ul className="flex flex-wrap gap-6 text-sm">
          <li>
            <NavLink to="/" end className={navClass}>
              홈
            </NavLink>
          </li>
        </ul>

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
