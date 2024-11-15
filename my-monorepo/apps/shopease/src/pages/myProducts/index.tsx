import { LoadingSkeleton } from "@/shared/layout/LoadingSkeleton";
import HomeButton from "../../shared/layout/HomeButton";
import { Layout, authStatusType } from "../../shared/layout/Layout";
import NavigationBar from "../../shared/layout/NavigationBar";
import MyProductsRegisterModal from "./components/MyProductsRegisterModal";
import React, { Suspense } from "react";

const MyProductsCard = React.lazy(() => import("./components/MyProductsCard"));

const MyProducts = () => {
  return (
    <Layout authStatus={authStatusType.SELLER}>
      <NavigationBar />
      <HomeButton style="absolute top-32 left-10" />
      <div className="flex items-center justify-center w-full h-48 border-b-[1px] border-gray-light">
        <h1 className="text-primary font-semibold text-[50px]">MyProducts</h1>
      </div>
      <MyProductsRegisterModal />
      <Suspense
        fallback={
          <LoadingSkeleton
            numberOfCards={10}
            styles="grid grid-cols-5 gap-4 items-start justify-items-center mx-40"
          />
        }
      >
        <MyProductsCard />
      </Suspense>
    </Layout>
  );
};

export default MyProducts;
