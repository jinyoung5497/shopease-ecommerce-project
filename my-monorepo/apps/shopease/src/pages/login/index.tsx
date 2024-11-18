import { useLogin } from "@/features/auth/hooks/useLogin";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback } from "react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Layout, authStatusType } from "../../shared/layout/Layout";
import HomeButton from "../../shared/layout/HomeButton";
import LoginForm from "./components/LoginForm";

const schema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력하세요"),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const { mutate: login } = useLogin();
  const { isSeller } = useAuthStore();

  const { handleSubmit } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = useCallback(
    (data) => {
      login({
        email: data.email,
        password: data.password,
      });
    },
    [login, isSeller],
  );

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
          <LoginForm />
        </form>
      </div>
    </Layout>
  );
};

export default Login;
