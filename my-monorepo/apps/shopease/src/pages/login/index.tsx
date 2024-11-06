import { useLogin } from "@/features/auth/hooks/useLogin";
import google from "../../../public/google.svg";
import { useNavigation } from "@/shared/hooks/useNavigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback } from "react";
import { useGoogleLogin } from "@/features/auth/hooks/useGoogleLogin";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Layout, authStatusType } from "../../shared/layout/Layout";
import HomeButton from "../../shared/layout/HomeButton";
import { Button } from "@/shared/components/button/Button";
import { Input } from "@/shared/components/input/Input";

const schema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력하세요"),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const { navToSignUp } = useNavigation();
  const { mutate: login, isPending: isLoading } = useLogin();
  const { mutate: googleLogin, isPending: isGoogleLoading } = useGoogleLogin();
  const { isSeller } = useAuthStore();

  const handleGoogleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    googleLogin(isSeller);
  };

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = useCallback(
    (data) => {
      login({
        email: data.email,
        password: data.password,
      });
    },
    [login, isSeller]
  );

  const handleBuyerLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    login({
      email: "testBuyer@gmail.com",
      password: "Qlalfqjsgh1!",
    });
  };
  const handleSellerLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    login({
      email: "testSeller@gmail.com",
      password: "Qlalfqjsgh1!",
    });
  };

  const handleNavToSignUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navToSignUp();
  };

  const clearButton = (field: "email" | "password") => {
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
          className="flex flex-col border-gray rounded-lg border-[1px] w-[450px] items-center justify-center gap-3 p-7 py-10"
        >
          <div className="text-primary text-[40px] font-medium">Login</div>
          <p className="text-primary mb-5">
            이메일 주소와 비밀번호를 입력하여 로그인하세요.
          </p>
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
          <Button
            full
            radius="full"
            size="large"
            type="submit"
            loading={isLoading}
            className="mt-5"
          >
            Login
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
            Google Login
          </Button>
          <div className="text-slate-400 text-[12px] ">
            <span>회원이 아니신가요? </span>
            <button
              className="underline hover:text-primary"
              onClick={handleNavToSignUp}
            >
              회원가입
            </button>
          </div>
          <div className="flex gap-4 mt-5">
            <button
              onClick={(event) => handleBuyerLogin(event)}
              className="bg-primary p-2 text-white rounded-[5px] text-[12px]"
            >
              구매자 로그인 Tester
            </button>
            <button
              onClick={(event) => handleSellerLogin(event)}
              className="bg-primary p-2 text-white rounded-[5px] text-[12px]"
            >
              판매자 로그인 Tester
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
