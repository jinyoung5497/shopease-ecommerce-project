import { useRegister } from "@/features/auth/hooks";
import { useGoogleLogin } from "@/features/auth/hooks/useGoogleLogin";
import { useNavigation } from "@/shared/hooks/useNavigation";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useSignUpHandler = () => {
  const { isSeller, setIsSellerTrue, setIsSellerFalse } = useAuthStore();
  const { mutate: googleLogin, isPending: isGoogleLoading } = useGoogleLogin();
  const { isPending: isLoading } = useRegister();

  const { navToLogin } = useNavigation();
  const handleNavToLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navToLogin();
  };

  const handleGoogleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    googleLogin(isSeller);
  };

  const handleIsSeller = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isSeller) {
      setIsSellerFalse();
    } else {
      setIsSellerTrue();
    }
  };

  return {
    handleGoogleLogin,
    handleIsSeller,
    handleNavToLogin,
    isSeller,
    isGoogleLoading,
    isLoading,
  };
};
