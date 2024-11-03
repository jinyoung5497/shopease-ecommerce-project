import HomeButton from "../../shared/layout/HomeButton";
import { Layout, authStatusType } from "../../shared/layout/Layout";
import NavigationBar from "../../shared/layout/NavigationBar";
import RegisterModal from "./components/RegisterModal";
import React, { Suspense } from "react";

const MyProductsCard = React.lazy(() => import("./components/MyProductsCard"));

const MyProducts = () => {
  return (
    <Layout authStatus={authStatusType.SELLER}>
      <div>
        <NavigationBar />
        <HomeButton style="absolute top-32 left-10" />
        <div className="flex items-center justify-center w-full h-48 border-b-[1px] border-gray-light">
          <h1 className="text-primary font-semibold text-[50px]">MyProducts</h1>
        </div>
      </div>

      <RegisterModal />
      <Suspense fallback={<LoadingSkeleton />}>
        <MyProductsCard />
      </Suspense>
    </Layout>
  );
};

export default MyProducts;

const LoadingSkeleton = () => (
  <div className="grid grid-cols-5 gap-20 items-center justify-items-center mx-40 mb-10">
    {[...Array(10)].map((_, index) => (
      <div
        key={index}
        className="bg-slate-100 rounded-[5px] w-44 h-60 flex items-center justify-center"
      />
    ))}
  </div>
);
