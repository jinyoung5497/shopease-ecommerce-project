import { useNavigation } from "@/hooks/useNavigation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useEffect } from "react";

const NavigationBar = () => {
  //TODO initCart when logged in

  const isLogin = useAuthStore((state) => state.isLogin);
  const logout = useAuthStore((state) => state.logout);
  const checkLoginStatus = useAuthStore((state) => state.checkLoginStatus);
  const isSeller = useAuthStore((state) => state.isSeller);
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

  const handleLogout = () => {
    logout();
    navToHome();
  };

  return (
    <div className="flex items-center justify-between p-7 w-full border-b-[1px] border-slate-400 text-primary">
      <button
        className="flex gap-2 text-[26px] items-center justify-center"
        onClick={navToHome}
      >
        <i className="fi fi-rs-basket-shopping-simple translate-y-[2px]"></i>
        <h1 className="font-medium text-primary">ShopEase</h1>
      </button>

      <div className="flex gap-7 items-center justify-center text-[16px]">
        {isSeller && isLogin && (
          <>
            <button
              onClick={navToMyProducts}
              className="flex gap-1 items-center justify-center"
            >
              <i className="fi fi-rs-supplier-alt translate-y-[1px]"></i>
              <p>My Products</p>
            </button>

            <button
              onClick={navToAdmin}
              className="flex gap-1 items-center justify-center"
            >
              <i className="fi fi fi-rs-admin-alt translate-y-[1px]"></i>
              <p>Admin</p>
            </button>
          </>
        )}

        {!isSeller && isLogin && (
          <button
            onClick={navToPurchaseHistory}
            className="flex gap-1 items-center justify-center"
          >
            <i className="fi fi fi-rs-time-past translate-y-[1px]"></i>
            <p>Purchase History</p>
          </button>
        )}

        {isLogin ? (
          <button
            className="flex gap-1 items-center justify-center"
            onClick={handleLogout}
          >
            <i className="fi fi-rs-user translate-y-[1px]"></i>
            <p>Logout</p>
          </button>
        ) : (
          <button
            className="flex gap-1 items-center justify-center"
            onClick={navToLogin}
          >
            <i className="fi fi-rs-user translate-y-[1px]"></i>
            <p>Login</p>
          </button>
        )}

        <button className="flex gap-1 items-center justify-center right-0 relative">
          <div className="rounded-full p-[10px] w-3 h-3 bg-primary flex items-center justify-center absolute z-10 left-3 bottom-4">
            <p className="text-white text-[12px]">2</p>
          </div>
          <i className="fi fi-rs-shopping-cart translate-y-[3px] text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
