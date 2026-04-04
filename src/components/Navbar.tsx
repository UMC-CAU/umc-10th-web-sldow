import { NavLink } from "react-router-dom";

//NavLink의 active 스타일링 기능
const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-emerald-500 font-medium"
    : "text-neutral-400 transition-colors hover:text-neutral-600";

export function Navbar() {
  return (
    <nav className="bg-white px-4 py-4">
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
    </nav>
  );
}
