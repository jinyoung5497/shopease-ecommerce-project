import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
  .refine(
    (value) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[A-Z])(?=.*\d)(?=.*[\W_])|(?=.*[a-z])(?=.*\d)(?=.*[\W_])/.test(
        value,
      ) || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W_)/.test(value),
    {
      message:
        "비밀번호는 영어 대문자, 소문자, 숫자, 특수문자 중 3종류 이상의 문자 조합이어야 합니다.",
    },
  )
  .refine(
    (value) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/.test(value) ||
      /^(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*\d)(?=.*[\W_])/.test(value),
    {
      message:
        "비밀번호는 10자 이상일 경우, 영어 대문자, 소문자, 숫자, 특수문자 중 2종류 이상의 문자 조합이어야 합니다.",
    },
  )
  .refine((value) => !/123|qwerty|password/.test(value), {
    message: "비밀번호에 쉬운 문자열 또는 잘 알려진 단어를 포함할 수 없습니다.",
  });

const schema = z.object({
  name: z.string().min(1, "이름은 필수입니다."),
  email: z.string().email("유효한 이메일 주소를 입력하세요"),
  password: passwordSchema,
});

export type FormFields = z.infer<typeof schema>;

export const useSignUpValidation = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  return { register, handleSubmit, resetField, errors };
};
