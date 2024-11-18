import { useGoogleLogin } from "@/features/auth/hooks/useGoogleLogin";
import { Button } from "@repo/ui/button/Button";
import { Input } from "@repo/ui/input/Input";
import google from "../../../app/assets/google.svg";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useLoginHandler } from "../hooks/useLoginHandler";

const LoginForm = () => {
  const { isPending: isGoogleLoading } = useGoogleLogin();
  const { isPending: isLoading } = useLogin();
  const {
    register,
    resetField,
    errors,
    handleBuyerLogin,
    handleGoogleLogin,
    handleSellerLogin,
    handleNavToSignUp,
  } = useLoginHandler();

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
    <>
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
        iconLeft={<img src={google} alt="google" className="w-4 h-4" />}
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
    </>
  );
};

export default LoginForm;
