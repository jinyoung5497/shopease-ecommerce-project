import { useFetchAdmin } from "@/features/order/hooks/useFetchAdmin";
import HomeButton from "../../shared/layout/HomeButton";
import { Layout, authStatusType } from "../../shared/layout/Layout";
import NavigationBar from "../../shared/layout/NavigationBar";
import { useUpdateOrder } from "@/features/order/hooks/useUpdateOrder";
import { Suspense, useCallback } from "react";
import React from "react";
import { LoadingSkeleton } from "@/shared/layout/LoadingSkeleton";

const RenderOrders = React.lazy(
  () => import("../../features/order/ui/RenderOrder")
);

const Administration = () => {
  const { data } = useFetchAdmin();
  const { mutate: updateStatus } = useUpdateOrder();

  const handleSelect = useCallback(
    (orderId: string | undefined, status: string) => {
      if (!orderId) throw new Error();
      updateStatus({ orderId, status });
    },
    [updateStatus]
  );

  return (
    <Layout authStatus={authStatusType.SELLER}>
      <div>
        <NavigationBar />
        <HomeButton style="absolute top-32 left-10" />
        <div className="flex flex-col items-center justify-center w-full h-48 border-b-[1px] border-gray-light">
          <h1 className="text-primary font-semibold text-[50px]">
            Administration
          </h1>
          <p>
            관리자 페이지에선 주문 완료된 상품들을 관리할 수 있는 페이지 입니다.
          </p>
        </div>
        <Suspense fallback={<LoadingSkeleton />}>
          <div className="grid grid-cols-4 gap-4 items-start justify-items-center mx-20 m-20">
            <RenderOrders data={data} handleSelect={handleSelect} />
          </div>
        </Suspense>
      </div>
    </Layout>
  );
};

export default Administration;
