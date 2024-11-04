import { useFetchCart } from "@/features/cart/hooks/useFetchCart";
import HomeButton from "../../shared/layout/HomeButton";
import { Layout, authStatusType } from "../../shared/layout/Layout";
import NavigationBar from "../../shared/layout/NavigationBar";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useAddOrder } from "@/features/order/hooks/useAddOrder";
import { useDeleteAllCart } from "@/features/cart/hooks/useDeleteCart";
import { useNavigation } from "@/shared/hooks/useNavigation";
import OrderInfomation from "./components/OrderInfomation";
import SubmitInfomation from "./components/SubmitInfomation";

const orderSchema = z.object({
  name: z.string().min(1, "주문자명을 입력해주세요."),
  phone: z.string().min(10, "연락처를 정확히 입력해주세요."),
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  postalCode: z.string().min(5, "우편번호를 입력해주세요."),
  address: z.string().min(1, "주소를 입력해주세요."),
});

type FormFields = z.infer<typeof orderSchema>;

const Checkout = () => {
  const { data } = useFetchCart();
  const { mutate: deleteAllCartItems } = useDeleteAllCart();
  const { mutate: addOrder } = useAddOrder();
  const { navToPurchaseHistory } = useNavigation();

  const {
    handleSubmit, // 제출 시 호출되는 함수
  } = useForm<FormFields>({
    resolver: zodResolver(orderSchema), // Zod 스키마를 사용한 유효성 검사 적용
  });

  const onSubmit: SubmitHandler<FormFields> = useCallback(() => {
    if (data) {
      const newOrders = data.map((product) => ({
        sellerId: product.sellerId,
        buyerId: product.buyerId,
        productId: product.productId,
        productQuantity: product.quantity,
        status: "주문 완료" as
          | "주문 완료"
          | "발송 대기"
          | "발송 시작"
          | "주문 취소",
      }));
      newOrders.forEach((order) => addOrder(order));
      navToPurchaseHistory();
      deleteAllCartItems();
    }
  }, [data, addOrder]);

  return (
    <Layout authStatus={authStatusType.BUYER}>
      <div>
        <NavigationBar />
        <HomeButton style="absolute top-32 left-10" />
        <div className="flex items-center justify-center w-full h-48 border-b-[1px] border-gray-light">
          <h1 className="text-primary font-semibold text-[50px]">Checkout</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex m-40 relative gap-10 justify-center"
        >
          <OrderInfomation data={data} />
          <SubmitInfomation data={data} />
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
