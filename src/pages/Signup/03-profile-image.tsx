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
          className="w-full rounded-md border border-pink-500 bg-neutral-900 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-pink-400"
          {...register("nickname")}
        />
        {errors.nickname && (
          <p className="text-xs font-medium text-pink-400" role="alert">
            {errors.nickname.message}
          </p>
        )}
      </div>
    </div>
  );
}
