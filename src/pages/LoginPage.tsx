import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { BackButton } from "../components/BackButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import { signin } from "../apis/userApi";

const loginSchema = z.object({
  email: z.email("유효하지 않은 이메일 형식입니다."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { setAuthData, isLoggedIn } = useAuth();

  // 로그인 상태면 홈으로 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: signin,
    onSuccess: (result) => {
      setAuthData(result);
      const redirectTo = sessionStorage.getItem("redirectTo") || "/";
      sessionStorage.removeItem("redirectTo");
      navigate(redirectTo, { replace: true });
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message ?? "로그인에 실패했습니다.";
      setErrorMessage(typeof msg === "string" ? msg : "로그인에 실패했습니다.");
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setErrorMessage(null);
    loginMutation.mutate(data);
  };

  return (
    <main className="relative flex flex-1 items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md">
        <section className="w-full">
          <header className="mb-8 grid grid-cols-[36px_1fr_36px] items-center">
            <BackButton />
            <h1 className="text-center text-2xl font-semibold tracking-tight text-pink-400">
              로그인
            </h1>
            <div aria-hidden className="h-9 w-9" />
          </header>

          <GoogleLoginButton />

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-700" />
            <span className="text-xs font-semibold tracking-widest text-neutral-400">
              OR
            </span>
            <div className="h-px flex-1 bg-neutral-700" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-2">
              <input
                type="email"
                autoComplete="email"
                placeholder="이메일을 입력해주세요!"
                className="w-full rounded-md border border-pink-500 bg-neutral-900 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-pink-400"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs font-medium text-pink-400" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <input
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호를 입력해주세요!"
                className="w-full rounded-md border border-pink-500 bg-neutral-900 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-pink-400"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs font-medium text-pink-400" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            {errorMessage && (
              <p className="text-xs font-medium text-pink-400" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={!isValid || loginMutation.isPending}
              aria-disabled={!isValid || loginMutation.isPending}
              className={`w-full rounded-md px-4 py-3 text-sm font-semibold text-white shadow-sm ${
                isValid && !loginMutation.isPending
                  ? "bg-pink-600 hover:bg-pink-700"
                  : "cursor-not-allowed bg-neutral-700 text-white/80"
              }`}
            >
              {loginMutation.isPending ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
