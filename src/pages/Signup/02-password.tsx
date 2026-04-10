import { useState } from "react";
import type { SignupStepProps } from "./signupSchema";
import EyeIcon from "../../assets/eye-regular-full.svg";
import EyeSlashIcon from "../../assets/eye-slash-regular-full.svg";

export function Step02Password({ register, errors }: SignupStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="비밀번호를 입력해주세요!"
            className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 pr-12 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 transition-colors"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-neutral-600 focus:outline-none transition-colors"
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            <img
              src={showPassword ? EyeIcon : EyeSlashIcon}
              alt=""
              className="h-5 w-5"
            />
          </button>
        </div>
        {errors.password && (
          <p className="text-xs font-medium text-red-500" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <input
            type={showPasswordConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder="비밀번호를 다시 한 번 입력해주세요!"
            className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 pr-12 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 transition-colors"
            {...register("passwordConfirm")}
          />
          <button
            type="button"
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-neutral-600 focus:outline-none transition-colors"
            aria-label={showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            <img
              src={showPasswordConfirm ? EyeIcon : EyeSlashIcon}
              alt=""
              className="h-5 w-5"
            />
          </button>
        </div>
        {errors.passwordConfirm && (
          <p className="text-xs font-medium text-red-500" role="alert">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>
    </div>
  );
}
