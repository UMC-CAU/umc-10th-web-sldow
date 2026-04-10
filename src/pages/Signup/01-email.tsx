import type { SignupStepProps } from "./signupSchema";

export function Step01Email({ register, errors }: SignupStepProps) {
  return (
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
  );
}
