import { Button } from "@repo/ui/button/Button";
import { Input } from "@repo/ui/input/Input";
import google from "../../../app/assets/google.svg";
import { useSignUpHandler } from "../hooks/useSignUpHandler";
import { useSignUpValidation } from "../hooks/useSignUpValidation";

const SignUpForm = () => {
  const {
    handleGoogleLogin,
    handleIsSeller,
    handleNavToLogin,
    isSeller,
    isGoogleLoading,
    isLoading,
  } = useSignUpHandler();
  const { register, resetField, errors } = useSignUpValidation();

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
    <>
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
        iconLeft={<img src={google} alt="google" className="w-4 h-4" />}
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
    </>
  );
};

export default SignUpForm;
