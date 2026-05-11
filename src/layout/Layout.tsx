import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { useState } from "react";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // 로그인/회원가입 페이지에서는 사이드바 및 플로팅 버튼 숨김
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname.includes('/callback');

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        {!isAuthPage && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        {!isAuthPage && <FloatingActionButton />}
      </div>
    </div>
  );
}
