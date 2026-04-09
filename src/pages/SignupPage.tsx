import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { BackButton } from "../components/BackButton";

export function SignupPage() {
  return (
    <main className="relative flex flex-1 items-center justify-center bg-white px-4 text-neutral-900">
      <div className="w-full max-w-md">
        <section className="w-full">
          <header className="mb-8 grid grid-cols-[36px_1fr_36px] items-center">
            <BackButton />
            <h1 className="text-center text-2xl font-semibold tracking-tight">
              회원가입
            </h1>
            <div aria-hidden className="h-9 w-9" />
          </header>

          <GoogleLoginButton />

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="text-xs font-semibold tracking-widest text-neutral-500">
              OR
            </span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              placeholder="이메일을 입력해주세요!"
              className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400"
            />

            <button
              type="submit"
              className="w-full rounded-md bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600"
            >
              다음
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
