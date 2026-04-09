import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { BackButton } from "../components/BackButton";
import { useMemo, useState } from "react";
import { useForm } from "../hooks/useForm";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function LoginPage() {
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  const emailForm = useForm({
    isValid: (email) => email.length > 0 && isValidEmail(email),
  });
  const passwordForm = useForm({
    isValid: (pw) => pw.length >= 6,
  });

  const emailError = useMemo(() => {
    if (!touchedEmail) return null;
    return isValidEmail(emailForm.form) ? null : "유효하지 않은 이메일 형식입니다.";
  }, [emailForm.form, touchedEmail]);

  const passwordError = useMemo(() => {
    if (!touchedPassword) return null;
    return passwordForm.form.length >= 6
      ? null
      : "비밀번호는 최소 6자 이상이어야 합니다.";
  }, [passwordForm.form, touchedPassword]);

  const canSubmit = emailForm.canSubmit && passwordForm.canSubmit;

  return (
    <main className="relative flex flex-1 items-center justify-center bg-white px-4 text-neutral-900">
      <div className="w-full max-w-md">
        <section className="w-full">
          <header className="mb-8 grid grid-cols-[36px_1fr_36px] items-center">
            <BackButton />
            <h1 className="text-center text-2xl font-semibold tracking-tight">
              로그인
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
              setTouchedEmail(true);
              setTouchedPassword(true);
              if (!canSubmit) return;
            }}
          >
            <div className="space-y-2">
              <input
                type="email"
                value={emailForm.form}
                onChange={(e) => emailForm.setForm(e.target.value)}
                onBlur={() => setTouchedEmail(true)}
                placeholder="이메일을 입력해주세요!"
                className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400"
              />
              {emailError && (
                <p className="text-xs font-medium text-red-500">{emailError}</p>
              )}
            </div>

            <div className="space-y-2">
              <input
                type="password"
                value={passwordForm.form}
                onChange={(e) => passwordForm.setForm(e.target.value)}
                onBlur={() => setTouchedPassword(true)}
                placeholder="비밀번호를 입력해주세요!"
                className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400"
              />
              {passwordError && (
                <p className="text-xs font-medium text-red-500">
                  {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              aria-disabled={!canSubmit}
              className={`w-full rounded-md px-4 py-3 text-sm font-semibold text-white shadow-sm ${
                canSubmit
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "cursor-not-allowed bg-neutral-300 text-white/80"
              }`}
            >
              로그인
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
