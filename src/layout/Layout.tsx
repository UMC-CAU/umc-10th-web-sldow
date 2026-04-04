import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function Layout() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <Outlet />
    </div>
  );
}