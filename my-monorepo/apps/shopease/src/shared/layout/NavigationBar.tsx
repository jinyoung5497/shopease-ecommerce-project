import { useNavigation } from "@/shared/hooks/useNavigation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useCallback, useEffect } from "react";
import { useFetchCart } from "@/features/cart/hooks/useFetchCart";
import { Button } from "@repo/ui/button/Button";
import React from "react";
import CartComponent from "./CartComponent";

const NavigationBar = React.memo(() => {
  const { isLogin, logout, checkLoginStatus, isSeller } = useAuthStore();

  const { data } = useFetchCart();

  const {
    navToLogin,
    navToAdmin,
    navToMyProducts,
    navToPurchaseHistory,
    navToHome,
  } = useNavigation();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const handleLogout = useCallback(() => {
    logout();
    navToHome();
  }, [logout, navToHome]);

  return (
    <div className="flex items-center justify-between p-7 w-full border-b-[1px] border-slate-400 text-primary">
      <Button variant="link" className="flex gap-2" onClick={navToHome}>
        <i className="fi fi-rs-basket-shopping-simple translate-y-[2px] text-[26px]"></i>
        <h1 className="font-medium text-[26px]">ShopEase</h1>
      </Button>

      <div className="flex items-center justify-center text-[16px]">
        {isSeller && isLogin && (
          <>
            <Button onClick={navToMyProducts} variant="link" size="large">
              <i className="fi fi-rs-supplier-alt translate-y-[1px]"></i>
              <p>My Products</p>
            </Button>

            <Button onClick={navToAdmin} variant="link" size="large">
              <i className="fi fi fi-rs-admin-alt translate-y-[1px]"></i>
              <p>Admin</p>
            </Button>
          </>
        )}

        {!isSeller && isLogin && (
          <Button onClick={navToPurchaseHistory} variant="link" size="large">
            <i className="fi fi fi-rs-time-past translate-y-[1px]"></i>
            <p>Purchase History</p>
          </Button>
        )}

        {isLogin ? (
          <Button onClick={handleLogout} variant="link" size="large">
            <i className="fi fi-rs-user translate-y-[1px]"></i>
            <p>Logout</p>
          </Button>
        ) : (
          <Button onClick={navToLogin} variant="link" size="large">
            <i className="fi fi-rs-user translate-y-[1px]"></i>
            <p>Login</p>
          </Button>
        )}

        <CartComponent data={data} />
      </div>
    </div>
  );
});

export default NavigationBar;
