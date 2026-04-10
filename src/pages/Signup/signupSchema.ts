import type { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { z } from "zod";

export type SignupFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  profileImage: File | undefined;
};

export type SignupStepProps = {
  register: UseFormRegister<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  setValue: UseFormSetValue<SignupFormValues>;
};

export function createSignupSchema(step: number) {
  return z
    .object({
      email: z.email("유효하지 않은 이메일 형식입니다."),
      password: z.string(),
      passwordConfirm: z.string(),
      nickname: z.string(),
      profileImage: z.custom<File | undefined>(
        (val) => val === undefined || val instanceof File,
      ),
    })
    .superRefine((data, ctx) => {
      if (step >= 1 && data.password.length < 6) {
        ctx.addIssue({
          code: "custom",
          path: ["password"],
          message: "비밀번호는 최소 6자 이상이어야 합니다.",
        });
      }
      if (step >= 1 && data.password !== data.passwordConfirm) {
        ctx.addIssue({
          code: "custom",
          path: ["passwordConfirm"],
          message: "비밀번호가 일치하지 않습니다.",
        });
      }
      if (step >= 2 && data.nickname.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["nickname"],
          message: "닉네임을 입력해주세요.",
        });
      }
      if (step >= 2 && !(data.profileImage instanceof File)) {
        ctx.addIssue({
          code: "custom",
          path: ["profileImage"],
          message: "프로필 이미지를 선택해주세요.",
        });
      }
    });
}
