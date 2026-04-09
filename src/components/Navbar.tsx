import { NavLink } from "react-router-dom";

//NavLink의 active 스타일링 기능
const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-emerald-500 font-medium"
    : "text-neutral-400 transition-colors hover:text-neutral-600";

export function Navbar() {
  return (
    <nav className="bg-white px-4 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <ul className="flex flex-wrap gap-6 text-sm">
          <li>
            <NavLink to="/" end className={navClass}>
              홈
            </NavLink>
          </li>
          <li>
            <NavLink to="/popular" className={navClass}>
              인기 영화
            </NavLink>
          </li>
          <li>
            <NavLink to="/now-playing" className={navClass}>
              상영 중
            </NavLink>
          </li>
          <li>
            <NavLink to="/top-rated" className={navClass}>
              평점 높은
            </NavLink>
          </li>
          <li>
            <NavLink to="/upcoming" className={navClass}>
              개봉 예정
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-neutral-900 ring-1 ring-neutral-200 hover:bg-neutral-100"
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
                  ? "bg-emerald-500 text-white"
                  : "bg-neutral-900 text-white hover:bg-neutral-700"
              }`
            }
          >
            로그인
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
