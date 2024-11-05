import { useCallback } from "react";
import google from "../../../public/google.svg";
import { useNavigation } from "@/shared/hooks/useNavigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegister } from "@/features/auth/api";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@/features/auth/hooks/useGoogleLogin";
import { Layout, authStatusType } from "../../shared/layout/Layout";
import HomeButton from "../../shared/layout/HomeButton";
import { Button } from "@/shared/components/button/Button";
import { Input } from "@/shared/components/input/Input";

const passwordSchema = z
  .string()
  .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
  .refine(
    (value) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[A-Z])(?=.*\d)(?=.*[\W_])|(?=.*[a-z])(?=.*\d)(?=.*[\W_])/.test(
        value
      ) || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W_)/.test(value),
    {
      message:
        "비밀번호는 영어 대문자, 소문자, 숫자, 특수문자 중 3종류 이상의 문자 조합이어야 합니다.",
    }
  )
  .refine(
    (value) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/.test(value) ||
      /^(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*\d)(?=.*[\W_])/.test(value),
    {
      message:
        "비밀번호는 10자 이상일 경우, 영어 대문자, 소문자, 숫자, 특수문자 중 2종류 이상의 문자 조합이어야 합니다.",
    }
  )
  .refine((value) => !/123|qwerty|password/.test(value), {
    message: "비밀번호에 쉬운 문자열 또는 잘 알려진 단어를 포함할 수 없습니다.",
  });

const schema = z.object({
  name: z.string().min(1, "이름은 필수입니다."),
  email: z.string().email("유효한 이메일 주소를 입력하세요"),
  password: passwordSchema,
});

type FormFields = z.infer<typeof schema>;

const SignUp = () => {
  const { navToLogin } = useNavigation();
  const { mutate: registerUser, isPending: isLoading } = useRegister();
  const { isSeller, setIsSellerTrue, setIsSellerFalse } = useAuthStore();
  const { mutate: googleLogin, isPending: isGoogleLoading } = useGoogleLogin();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const handleIsSeller = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isSeller) {
      setIsSellerFalse();
    } else {
      setIsSellerTrue();
    }
  };

  const onSubmit: SubmitHandler<FormFields> = useCallback(
    (data) => {
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        isSeller: isSeller,
      });
    },
    [registerUser, isSeller]
  );

  const handleNavToLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navToLogin();
  };

  const handleGoogleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    googleLogin(isSeller);
  };

  const clearButton = (field: "email" | "password" | "name") => {
    return (
      <Button
        onClick={(event) => {
          event.preventDefault();
          resetField(field);
        }}
        variant="link"
      >
        <i className="fi fi-rs-cross-small"></i>
      </Button>
    );
  };

  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <div className="h-screen flex items-center justify-center">
        <HomeButton style="absolute top-20 left-24" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col border-gray rounded-lg border-[1px] w-[450px] items-center justify-center gap-2 p-7 py-10"
        >
          <div className="text-primary text-[35px] font-medium w-full text-center mb-4">
            Create your account
          </div>
          <Input
            {...register("name")}
            id="name"
            type="text"
            placeholder="이름을 입력하세요"
            full
            label="이름"
            radius="medium"
            isError={errors.name}
            errorMessage={errors.name?.message}
            leftIcon={<i className="fi fi-rs-user"></i>}
            rightIcon={clearButton("name")}
          />
          <Input
            {...register("email")}
            id="email"
            type="text"
            placeholder="이메일을 입력하세요"
            full
            label="이메일"
            radius="medium"
            isError={errors.email}
            errorMessage={errors.email?.message}
            leftIcon={<i className="fi fi-rs-envelope"></i>}
            rightIcon={clearButton("email")}
          />
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            full
            label="비밀번호"
            isError={errors.password}
            errorMessage={errors.password?.message}
            radius="medium"
            leftIcon={<i className="fi fi-rs-lock"></i>}
            rightIcon={clearButton("password")}
          />
          <div className="flex items-center justify-start gap-3 mb-7 w-full">
            <button
              className={`rounded-full border-primary border-[1px] w-10 h-6 p-[3px] flex ${
                isSeller ? "justify-end" : "justify-start"
              }`}
              onClick={handleIsSeller}
            >
              <div className="rounded-full bg-primary w-4 h-4"></div>
            </button>
            <p className="text-primary text-sm">
              {isSeller ? "판매자입니다 " : "구매자입니다"}
            </p>
          </div>
          <Button type="submit" full radius="full" loading={isLoading}>
            {isLoading ? "Submitting" : "Sign Up"}
          </Button>
          <div className="text-[12px] text-slate-400">or continue with</div>

          <Button
            icon={<img src={google} alt="google" className="w-4 h-4" />}
            full
            radius="full"
            loading={isGoogleLoading}
            variant="outline"
            onClick={handleGoogleLogin}
            size="large"
          >
            Sign up with Google
          </Button>
          <div className="text-slate-400 text-[12px] ">
            <span>이미 계정이 있으신가요? </span>
            <button
              className="underline hover:text-primary"
              onClick={handleNavToLogin}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
