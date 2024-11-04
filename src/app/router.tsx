import { createBrowserRouter, Outlet } from "react-router-dom";

import { pageRoutes } from "@/app/apiRoutes";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Administration from "../pages/administration";
import CategoryProduct from "@/pages/categoryProduct";
import Checkout from "../pages/checkout";
import DetailedProduct from "../pages/detailedProduct";
import MyProducts from "../pages/myProducts";
import PurchaseHistory from "../pages/purchaseHistory";
import SignUp from "../pages/signUp";
import { ErrorPage } from "../shared/error/ErrorPage";
import { NotFoundPage } from "../shared/error/NotFoundPage";
import { RootErrorBoundary } from "@/shared/layout/RootErrorHandler";
import { RootSuspense } from "@/shared/layout/RootSuspense";

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
