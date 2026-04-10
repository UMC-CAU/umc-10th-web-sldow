import type { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

type BackButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function BackButton({ onClick }: BackButtonProps) {
  const navigate = useNavigate();

  // onClick이 제공되지 않으면 이전 페이지로 이동
  const handleClick: MouseEventHandler<HTMLButtonElement> =
    onClick ??
    (() => {
      navigate(-1);
    });

  return (
    <button type="button" onClick={handleClick}>
      <span>&lt;</span>
    </button>
  );
}
