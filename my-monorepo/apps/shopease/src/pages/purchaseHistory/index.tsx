import { useFetchOrder } from "@/features/order/hooks/useFetchOrder";
import HomeButton from "../../shared/layout/HomeButton";
import { Layout, authStatusType } from "../../shared/layout/Layout";
import NavigationBar from "../../shared/layout/NavigationBar";
import { useUpdateOrder } from "@/features/order/hooks/useUpdateOrder";
import { useUpdateProductQuantity } from "@/features/product/hooks/useUpdateProductQuantity";
import { Button } from "@/shared/components/button/Button";

const PurchaseHistory = () => {
  const { data } = useFetchOrder();
  const { mutate: updateStatus } = useUpdateOrder();
  const { mutate: updateQuantity } = useUpdateProductQuantity();

  const updateOrder = (
    id: string | undefined,
    productId: string | undefined
  ) => {
    if (id) {
      updateStatus({ orderId: id, status: "주문 취소" });
    }
    if (productId) {
      updateQuantity({ productId, quantity: -1 });
    }
  };

  return (
    <Layout authStatus={authStatusType.BUYER}>
      <div>
        <NavigationBar />
        <HomeButton style="absolute top-32 left-10" />
        <div className="flex items-center justify-center w-full h-48 border-b-[1px] border-gray-light">
          <h1 className="text-primary font-semibold text-[50px]">
            PurchaseHistory
          </h1>
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-sky-50 w-3/5 flex flex-col justify-center gap-7 p-16 m-10 border-[1px] border-slate-400 rounded-[10px]">
            <h1 className="text-primary font-semibold border-slate-300 border-b-[1px] pb-4">
              구매한 품목
            </h1>
            {data?.map((value, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-between border-slate-300 border-b-[1px] pb-4"
              >
                <div className="flex gap-10">
                  <img
                    src={value.productDetails?.image}
                    alt="productImage"
                    className="w-32"
                  />
                  <div className="flex flex-col items-start justify-center gap-4 text-primary">
                    <div>{value.productDetails?.name}</div>
                    <div>
                      {value.productDetails?.price.toLocaleString("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                      })}
                      원
                    </div>
                    <div>판매자: {value.productDetails?.sellerName}</div>
                  </div>
                </div>
                {value.status !== "주문 취소" ? (
                  <Button
                    onClick={() => updateOrder(value.id, value.productId)}
                    color="red"
                    size="xlarge"
                  >
                    구매 취소
                  </Button>
                ) : (
                  <div className="font-semibold text-red-500">
                    이 상품은 주문이 취소 되었습니다.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PurchaseHistory;
