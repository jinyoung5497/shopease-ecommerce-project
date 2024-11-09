import { createBrowserRouter, Outlet } from "react-router-dom";

import { pageRoutes } from "@/app/apiRoutes";
import { ErrorPage } from "../shared/error/ErrorPage";
import { NotFoundPage } from "../shared/error/NotFoundPage";
import { RootErrorBoundary } from "@/shared/layout/RootErrorHandler";
import { RootSuspense } from "@/shared/layout/RootSuspense";
import { lazy } from "react";

const Home = lazy(() => import("@/pages/home"));
const Login = lazy(() => import("@/pages/login"));
const Administration = lazy(() => import("../pages/administration"));
const CategoryProduct = lazy(() => import("@/pages/categoryProduct"));
const Checkout = lazy(() => import("../pages/checkout"));
const DetailedProduct = lazy(() => import("@/pages/detailedProduct"));
const MyProducts = lazy(() => import("../pages/myProducts"));
const PurchaseHistory = lazy(() => import("../pages/purchaseHistory"));
const SignUp = lazy(() => import("../pages/signUp"));

const CommonLayout = () => (
  <RootErrorBoundary>
    <RootSuspense>
      <Outlet />
    </RootSuspense>
  </RootErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.home, element: <Home />, errorElement: <ErrorPage /> },
      {
        path: pageRoutes.login,
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.administration,
        element: <Administration />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.categoryProduct,
        element: <CategoryProduct />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.checkout,
        element: <Checkout />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.detailedProduct,
        element: <DetailedProduct />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.myProducts,
        element: <MyProducts />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.purchaseHistory,
        element: <PurchaseHistory />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.signUp,
        element: <SignUp />,
        errorElement: <ErrorPage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
