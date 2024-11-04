import { useFetchAdmin } from "@/features/order/hooks/useFetchAdmin";
import HomeButton from "../../shared/layout/HomeButton";
import { Layout, authStatusType } from "../../shared/layout/Layout";
import NavigationBar from "../../shared/layout/NavigationBar";
import { useUpdateOrder } from "@/features/order/hooks/useUpdateOrder";
import { renderOrders } from "@/features/order/ui/renderOrders";

const Administration = () => {
  const { data } = useFetchAdmin();
  const { mutate: updateStatus } = useUpdateOrder();

  const handleSelect = (orderId: string | undefined, status: string) => {
    if (!orderId) throw new Error();
    updateStatus({ orderId, status });
  };

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

        <div className="grid grid-cols-4 gap-4 items-start justify-items-center mx-20 m-20">
          {renderOrders({ data, handleSelect })}
        </div>
      </div>
    </Layout>
  );
};

export default Administration;
