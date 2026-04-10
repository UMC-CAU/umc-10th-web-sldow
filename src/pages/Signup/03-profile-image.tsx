import { ProfileImageSelector } from "../../components/auth/ProfileImageSelector";
import type { SignupStepProps } from "./signupSchema";

export function Step03ProfileImage({ register, errors, setValue }: SignupStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <ProfileImageSelector
          onFileSelect={(file) =>
            setValue("profileImage", file, { shouldValidate: true })
          }
        />
        {errors.profileImage && (
          <p className="text-xs font-medium text-red-500" role="alert">
            {errors.profileImage.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <input
          type="text"
          autoComplete="nickname"
          placeholder="닉네임을 입력해주세요!"
          className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400"
          {...register("nickname")}
        />
        {errors.nickname && (
          <p className="text-xs font-medium text-red-500" role="alert">
            {errors.nickname.message}
          </p>
        )}
      </div>
    </div>
  );
}
