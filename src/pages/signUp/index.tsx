import { useCallback } from "react";
import google from "../../assets/google.svg";
import { useNavigation } from "@/hooks/useNavigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegister } from "@/lib/auth";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@/lib/auth/hooks/useGoogleLogin";
import { Layout, authStatusType } from "../common/components/Layout";
import HomeButton from "../common/components/HomeButton";

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
  .refine((value) => !/(\d{3,})|(\w{3,})/.test(value), {
    message:
      "비밀번호에 쉬운 일련번호나 나란히 있는 문자열을 포함할 수 없습니다.",
  })
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
  const { isSeller, setIsSeller } = useAuthStore();
  const { mutate: googleLogin, isPending: isGoogleLoading } = useGoogleLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const handleIsSeller = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSeller();
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
    [registerUser]
  );

  const handleNavToLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navToLogin();
  };

  const handleGoogleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    googleLogin(isSeller);
  };

  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <div className="h-screen flex items-center justify-center">
        <HomeButton style="absolute top-20 left-24" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col border-gray rounded-lg border-[1px] w-[450px] items-center justify-center gap-1 p-7 py-10"
        >
          <div className="text-primary text-[35px] font-medium w-full text-center mb-4">
            Create your account
          </div>
          <p className="w-full text-sm text-primary">이름</p>
          <input
            {...register("name")}
            id="name"
            type="text"
            placeholder="이름을 입력하세요"
            className="w-full p-3 border-primary rounded-[7px] border-[1px]"
          />
          {errors.name && (
            <div className="text-red-700 w-full mb-2">
              {errors.name.message}
            </div>
          )}
          <p className="w-full text-sm text-primary">이메일</p>
          <input
            {...register("email")}
            id="email"
            type="text"
            placeholder="이메일를 입력하세요"
            className="w-full p-3 border-primary rounded-[7px] border-[1px]"
          />
          {errors.email && (
            <div className="text-red-700 w-full mb-2">
              {errors.email.message}
            </div>
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
            <div className="text-red-700 w-full">{errors.password.message}</div>
          )}
          <div className="flex items-center justify-start gap-3 mb-7 w-full mt-2">
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
          <button
            type="submit"
            className={`rounded-full text-white w-full p-2 text-sm h-11 hover:bg-sky-800 ${
              isLoading ? "bg-sky-800" : "bg-primary"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting" : "Sign Up"}
          </button>
          <div className="text-[12px] text-slate-400">or continue with</div>

          <button
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="rounded-full text-primary border-[1px] border-primary w-full p-2 text-sm h-11 flex items-center justify-center gap-4 mb-4"
          >
            <img src={google} alt="google" className="w-4 h-4" />
            Sign up with Google
          </button>
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
