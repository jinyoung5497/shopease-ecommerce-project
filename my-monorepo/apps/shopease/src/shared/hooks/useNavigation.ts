import { pageRoutes } from "@/app/apiRoutes";
import { useNavigate } from "react-router";

export const useNavigation = () => {
  const navigate = useNavigate();

  const navToHome = () => navigate(pageRoutes.home);
  const navToLogin = () => navigate(pageRoutes.login);
  const navToSignUp = () => navigate(pageRoutes.signUp);
  const navToAdmin = () => navigate(pageRoutes.administration);
  const navToCategoryProduct = () => navigate(pageRoutes.categoryProduct);
  const navToFilteredProduct = (path: string) => navigate(path);
  const navToCheckout = () => navigate(pageRoutes.checkout);
  const navToDetailedProduct = (id: string) =>
    navigate(pageRoutes.detailedProduct.replace(":id", id));
  const navToMyProducts = () => navigate(pageRoutes.myProducts);
  const navToPurchaseHistory = () => navigate(pageRoutes.purchaseHistory);

  return {
    navToHome,
    navToLogin,
    navToSignUp,
    navToAdmin,
    navToCategoryProduct,
    navToCheckout,
    navToDetailedProduct,
    navToMyProducts,
    navToPurchaseHistory,
    navToFilteredProduct,
  };
};
