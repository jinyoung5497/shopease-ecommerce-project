import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { useRegister } from "@/features/auth/api";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Layout, authStatusType } from "../../shared/layout/Layout";
import HomeButton from "../../shared/layout/HomeButton";
import SignUpForm from "./components/SignUpForm";
import { FormFields, useSignUpValidation } from "./hooks/useSignUpValidation";

const SignUp = () => {
  const { mutate: registerUser } = useRegister();
  const { isSeller } = useAuthStore();
  const { handleSubmit } = useSignUpValidation();

  const onSubmit: SubmitHandler<FormFields> = useCallback(
    (data) => {
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        isSeller: isSeller,
      });
    },
    [registerUser, isSeller],
  );

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
          <SignUpForm />
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
