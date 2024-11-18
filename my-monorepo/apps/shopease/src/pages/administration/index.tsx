import HomeButton from "../../shared/layout/HomeButton";
import { Layout, authStatusType } from "../../shared/layout/Layout";
import NavigationBar from "../../shared/layout/NavigationBar";
import { Suspense } from "react";
import React from "react";
import { LoadingSkeleton } from "@/shared/layout/LoadingSkeleton";
import AdminTitle from "./components/AdminTitle";

const AdminRenderOrders = React.lazy(
  () => import("./components/AdminRenderOrder"),
);

const Administration = () => {
  return (
    <Layout authStatus={authStatusType.SELLER}>
      <NavigationBar />
      <HomeButton style="absolute top-32 left-10" />
      <AdminTitle />
      <Suspense
        fallback={
          <LoadingSkeleton
            numberOfCards={4}
            styles="grid grid-cols-4 gap-4 items-start justify-items-center mx-20 m-20"
          />
        }
      >
        <AdminRenderOrders />
      </Suspense>
    </Layout>
  );
};

export default Administration;
