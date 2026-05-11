import { useMemo, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "../../components/GoogleLoginButton";
import { BackButton } from "../../components/BackButton";
import { Step01Email } from "./01-email";
import { Step02Password } from "./02-password";
import { Step03ProfileImage } from "./03-profile-image";
import { createSignupSchema, type SignupFormValues } from "./signupSchema";
import { useAuth } from "../../hooks/useAuth";

const STEP_FIELDS: (keyof SignupFormValues)[][] = [
  ["email"],
  ["password", "passwordConfirm"],
  ["nickname", "profileImage"],
];

const STEP_COUNT = STEP_FIELDS.length;

export function SignupPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [step, setStep] = useState(0);

  // 로그인 상태면 홈으로 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const signupSchema = useMemo(() => createSignupSchema(step), [step]);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      nickname: "",
      profileImage: undefined,
    },
  });

  //로컬서버로 요청 보내는 회원가입 로직
  const onComplete = async (data: SignupFormValues) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/v1/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            name: data.nickname,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "회원가입에 실패했습니다.");
      }

      const signupData = await response.json();
      console.log("회원가입 정보:", signupData);
      navigate("/login");
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert(
        error instanceof Error ? error.message : "회원가입에 실패했습니다."
      );
    }
  };

  const goNext = async () => {
    const fields = STEP_FIELDS[step];
    const ok = await trigger(fields);
    if (!ok) return;
    if (step < STEP_COUNT - 1) {
      setStep((s) => s + 1);
    } else {
      await handleSubmit(onComplete)();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <main className="relative flex flex-1 items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md">
        <section className="w-full">
          <header className="mb-8 grid grid-cols-[36px_1fr_36px] items-center">
            <BackButton onClick={handleBack} />
            <h1 className="text-center text-2xl font-semibold tracking-tight text-pink-400">
              회원가입
            </h1>
            <div aria-hidden className="h-9 w-9" />
          </header>

          {step === 0 && (
            <>
              <GoogleLoginButton />

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-neutral-700" />
                <span className="text-xs font-semibold tracking-widest text-neutral-400">
                  OR
                </span>
                <div className="h-px flex-1 bg-neutral-700" />
              </div>
            </>
          )}

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void goNext();
            }}
            noValidate
          >
            {step === 0 && (
              <Step01Email register={register} errors={errors} setValue={setValue} />
            )}
            {step === 1 && (
              <Step02Password register={register} errors={errors} setValue={setValue} />
            )}
            {step === 2 && (
              <Step03ProfileImage register={register} errors={errors} setValue={setValue} />
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-pink-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-pink-700"
            >
              다음
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
