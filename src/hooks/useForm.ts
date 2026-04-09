import { useState } from "react";

export type useFormProps = {
  isValid: (form: string) => boolean;
};

export function useForm({ isValid }: useFormProps) {
  const [form, setForm] = useState<string>("");

  const canSubmit = isValid(form);

  return { form, setForm, canSubmit };
}