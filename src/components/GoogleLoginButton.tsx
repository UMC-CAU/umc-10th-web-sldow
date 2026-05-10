import googleLogo from "../assets/google.png";

export function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/v1/auth/google/login`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="relative w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800"
    >
      <img
        src={googleLogo}
        alt=""
        aria-hidden
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
      />
      <span className="block w-full text-center">구글 로그인</span>
    </button>
  );
}
