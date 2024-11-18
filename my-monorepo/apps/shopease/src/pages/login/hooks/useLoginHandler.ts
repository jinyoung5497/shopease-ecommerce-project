import { useGoogleLogin } from "@/features/auth/hooks/useGoogleLogin";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useNavigation } from "@/shared/hooks/useNavigation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력하세요"),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});

type FormFields = z.infer<typeof schema>;

export const useLoginHandler = () => {
  const { mutate: googleLogin } = useGoogleLogin();
  const { mutate: login } = useLogin();
  const { navToSignUp } = useNavigation();
  const { isSeller } = useAuthStore();

  const {
    register,
    resetField,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const handleGoogleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    googleLogin(isSeller);
  };

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

  return {
    register,
    resetField,
    errors,
    handleBuyerLogin,
    handleGoogleLogin,
    handleSellerLogin,
    handleNavToSignUp,
  };
};
