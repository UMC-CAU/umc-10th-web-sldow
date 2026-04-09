import googleLogo from "../assets/google.png";

export type GoogleLoginButtonProps = {
  onClick?: () => void;
};

export function GoogleLoginButton({ onClick }: GoogleLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
    >
      <img
        src={googleLogo}
        alt=""
        aria-hidden
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
      />
      {/*인라인이므로 block*/}
      <span className="block w-full text-center">구글 로그인</span>
    </button>
  );
}
