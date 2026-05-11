import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoginRequiredModal } from "./LoginRequiredModal";

export function ProtectedRoute() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      // 원래 가려던 URL을 sessionStorage에 저장
      sessionStorage.setItem("redirectTo", location.pathname + location.search);
      setShowModal(true);
    }
  }, [isLoggedIn, location]);

  if (!isLoggedIn) {
    return <LoginRequiredModal isOpen={showModal} onClose={() => setShowModal(false)} />;
  }

  return <Outlet />;
}
