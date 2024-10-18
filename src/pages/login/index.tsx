import { useLogin } from "@/lib/auth/hooks/useLogin";
import google from "../../assets/google.svg";
import { useNavigation } from "@/hooks/useNavigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback } from "react";
import { useGoogleLogin } from "@/lib/auth/hooks/useGoogleLogin";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Layout, authStatusType } from "../common/components/Layout";
import HomeButton from "../common/components/HomeButton";

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
    [login]
  );

  const handleNavToSignUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navToSignUp();
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
          <p className="w-full text-sm text-primary">이메일</p>
          <input
            {...register("email")}
            id="email"
            type="text"
            placeholder="이메일을 입력하세요"
            className="w-full p-3 border-primary rounded-[7px] border-[1px] "
          />
          {errors.email && (
            <p className="w-full text-red-600 text-sm">
              {errors.email?.message}
            </p>
          )}
          <p className="w-full text-sm text-primary">비밀번호</p>
          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full p-3 border-primary rounded-[7px] border-[1px]"
          />
          {errors.password && (
            <p className="w-full text-red-600 text-sm">
              {errors.password?.message}
            </p>
          )}
          <button
            disabled={isLoading}
            type="submit"
            className="rounded-full text-white bg-primary w-full p-2 text-sm h-11 mt-4 hover:bg-sky-800"
          >
            Log In
          </button>
          <div className="text-[12px] text-slate-400">or continue with</div>

          <button
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="rounded-full text-primary border-[1px] border-primary w-full p-2 text-sm h-11 flex items-center justify-center gap-4 mb-4"
          >
            <img src={google} alt="google" className="w-4 h-4" />
            Google Login
          </button>
          <div className="text-slate-400 text-[12px] ">
            <span>회원이 아니신가요? </span>
            <button
              className="underline hover:text-primary"
              onClick={handleNavToSignUp}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
