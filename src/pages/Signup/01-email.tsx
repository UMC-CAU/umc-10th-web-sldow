import type { SignupStepProps } from "./signupSchema";

export function Step01Email({ register, errors }: SignupStepProps) {
  return (
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
  );
}
