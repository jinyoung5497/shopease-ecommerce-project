import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// import { useAuthStore } from "@/store/auth/useAuthStore";

import { pageRoutes } from "@/apiRoutes";
import NavigationBar from "./NavigationBar";

export const authStatusType = {
  NEED_LOGIN: "NEED_LOGIN",
  NEED_NOT_LOGIN: "NEED_NOT_LOGIN",
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
  //   const isLogin = useAuthStore((state) => state.isLogin);

  if (authStatus === authStatusType.NEED_LOGIN) {
    return <Navigate to={pageRoutes.login} />;
  }

  if (authStatus === authStatusType.NEED_NOT_LOGIN) {
    return <Navigate to={pageRoutes.home} />;
  }

  return (
    <div>
      <NavigationBar />
      <div className="">
        <main className="">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
};
