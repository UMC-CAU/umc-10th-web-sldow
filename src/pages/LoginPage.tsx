import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { BackButton } from "../components/BackButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email("유효하지 않은 이메일 형식입니다."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (_data: LoginFormValues) => {
    // 로그인 API 연동 시 여기서 처리
    console.log("로그인 완료!");
  };

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

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-2">
              <input
                type="email"
                autoComplete="email"
                placeholder="이메일을 입력해주세요!"
                className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs font-medium text-red-500" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <input
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호를 입력해주세요!"
                className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs font-medium text-red-500" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              aria-disabled={!isValid}
              className={`w-full rounded-md px-4 py-3 text-sm font-semibold text-white shadow-sm ${isValid
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
