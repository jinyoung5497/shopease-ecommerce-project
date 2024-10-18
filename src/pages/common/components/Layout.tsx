import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// import { useAuthStore } from "@/store/auth/useAuthStore";

import { pageRoutes } from "@/apiRoutes";
import { useAuthStore } from "@/store/auth/useAuthStore";

// export const authStatusType = {
//   NEED_LOGIN: "NEED_LOGIN",
//   NEED_NOT_LOGIN: "NEED_NOT_LOGIN",
//   COMMON: "COMMON",
// };

export const authStatusType = {
  NEED_LOGIN: "NEED_LOGIN",
  NEED_NOT_LOGIN: "NEED_NOT_LOGIN",
  SELLER: "SELLER",
  BUYER: "BUYER",
  COMMON: "COMMON",
};

interface LayoutProps {
  children: ReactNode;
  containerClassName?: string;
  authStatus?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  authStatus = authStatusType.COMMON,
}) => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const isSeller = useAuthStore((state) => state.isSeller);

  if (authStatus === authStatusType.NEED_LOGIN && !isLogin) {
    return <Navigate to={pageRoutes.login} />;
  }

  if (authStatus === authStatusType.NEED_NOT_LOGIN && isLogin) {
    return <Navigate to={pageRoutes.home} />;
  }

  if (authStatus === authStatusType.SELLER && (!isSeller || !isLogin)) {
    return <Navigate to={pageRoutes.home} />;
  }

  if (authStatus === authStatusType.BUYER && (isSeller || !isLogin)) {
    return <Navigate to={pageRoutes.home} />;
  }

  return (
    <div>
      <div className="">
        <main className="">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
};
