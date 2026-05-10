import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <Outlet />
    </div>
  );
}
