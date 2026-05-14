import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { deleteAccount } from '../apis/userApi';
import { ConfirmModal } from './ConfirmModal';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoggedIn, logout } = useAuth();
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-pink-500 font-medium text-lg'
      : 'text-neutral-400 transition-colors hover:text-neutral-300 text-lg';

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const withdrawMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      logout();
      queryClient.clear();
      setIsWithdrawOpen(false);
      navigate('/login', { replace: true });
    },
  });

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
        <nav className="p-6 h-full flex flex-col">
          <ul className="space-y-3 flex-1">
            <li>
              <NavLink to="/" className={navClass} onClick={handleNavClick}>
                홈
              </NavLink>
            </li>
            <li>
              <NavLink to="/my" className={navClass} onClick={handleNavClick}>
                마이페이지
              </NavLink>
            </li>
          </ul>

          {isLoggedIn && (
            <button
              onClick={() => setIsWithdrawOpen(true)}
              className="text-left text-sm text-neutral-500 hover:text-red-400 transition"
            >
              탈퇴하기
            </button>
          )}
        </nav>
      </aside>

      <ConfirmModal
        isOpen={isWithdrawOpen}
        title="정말 탈퇴하시겠습니까?"
        message="계정과 모든 게시글, 댓글, 좋아요 정보가 영구적으로 삭제됩니다."
        confirmLabel={withdrawMutation.isPending ? '처리 중...' : '예'}
        cancelLabel="아니오"
        confirmDisabled={withdrawMutation.isPending}
        onConfirm={() => withdrawMutation.mutate()}
        onCancel={() => {
          if (!withdrawMutation.isPending) setIsWithdrawOpen(false);
        }}
      />
    </>
  );
}
