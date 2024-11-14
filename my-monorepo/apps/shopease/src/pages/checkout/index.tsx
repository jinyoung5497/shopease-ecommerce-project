import { useFetchCart } from "@/features/cart/hooks/useFetchCart";
import { Layout, authStatusType } from "../../shared/layout/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useAddOrder } from "@/features/order/hooks/useAddOrder";
import { useDeleteAllCart } from "@/features/cart/hooks/useDeleteCart";
import { useNavigation } from "@/shared/hooks/useNavigation";
import OrderInfomation from "./components/OrderInfomation";
import SubmitInfomation from "./components/SubmitInfomation";
import * as PortOne from "@portone/browser-sdk/v2";
import { useSmoothScrollToTop } from "@/shared/hooks/useSmoothScrollToTop";
import { useUpdateProductQuantity } from "@/features/product/hooks/useUpdateProductQuantity";
import { Modal } from "@repo/ui/modal/Modal";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@repo/ui/button/Button";

const orderSchema = z.object({
  name: z.string().min(1, "주문자명을 입력해주세요."),
  phone: z.string().min(10, "연락처를 정확히 입력해주세요."),
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  postalCode: z.string().min(5, "우편번호를 입력해주세요."),
  address: z.string().min(1, "주소를 입력해주세요."),
});

export type FormFields = z.infer<typeof orderSchema>;

const Checkout = () => {
  const { data } = useFetchCart();
  const { mutate: deleteAllCartItems } = useDeleteAllCart();
  const { mutate: addOrder } = useAddOrder();
  const { mutate: updateQuantity } = useUpdateProductQuantity();
  const { navToPurchaseHistory, navToHome } = useNavigation();
  const scrollToTop = useSmoothScrollToTop();

  // 세로고침 감지
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // 사용자가 세로고침 시 경고 메시지를 표시
      event.preventDefault();
      data?.map((value) =>
        updateQuantity({
          productId: value.productId,
          quantity: 1,
        }),
      );
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!data) navToHome();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(orderSchema),
  });

  const totalPrice =
    data?.reduce(
      (total, product) => total + product.productPrice * product.quantity,
      0,
    ) || 0;

  const storeId = import.meta.env.VITE_PORTONE_STORE_ID;
  const channelKey = import.meta.env.VITE_PORTONE_CHANNEL_KEY;

  const onSubmit: SubmitHandler<FormFields> = useCallback(async () => {
    try {
      if (data) {
        const orderNames = data.map((value) => value.productName).join("\n");
        const response = await PortOne.requestPayment({
          storeId: storeId,
          channelKey: channelKey,
          paymentId: `payment-${crypto.randomUUID()}`,
          orderName: orderNames,
          totalAmount: totalPrice,
          currency: "CURRENCY_KRW",
          payMethod: "CARD",
        });

        if (response && response.code !== undefined) {
          return alert(response.message);
        }

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
        await Promise.all(newOrders.map((order) => addOrder(order)));
        deleteAllCartItems();
        navToPurchaseHistory();
        scrollToTop();
      }
    } catch (error) {
      console.error("Error processing order:", error);
      alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }, [data, addOrder, navToPurchaseHistory, deleteAllCartItems, scrollToTop]);

  return (
    <Layout authStatus={authStatusType.BUYER}>
      <div>
        <Modal.Root>
          <Modal.Trigger>
            <Button
              variant="link"
              iconLeft={<ArrowLeft />}
              className="absolute top-60 left-10"
            >
              돌아가기
            </Button>
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Close topRight>
              <X className="h-5 w-5" />
            </Modal.Close>
            <Modal.Header>
              <Modal.Title title="결제 취소" />
              <Modal.Description description="결제를 취소하고 홈으로 돌아갑니다." />
            </Modal.Header>
            <Modal.Divider />
            <Modal.Footer>
              <div className="flex items-center justify-center mt-4">
                <Button
                  full
                  onClick={() => {
                    data?.map((value) =>
                      updateQuantity({
                        productId: value.productId,
                        quantity: 1,
                      }),
                    );
                    navToHome();
                  }}
                >
                  결제 취소
                </Button>
              </div>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>
        <div className="flex items-center justify-center w-full h-48 border-b-[1px] border-gray-light">
          <h1 className="text-primary font-semibold text-[50px]">Checkout</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex m-40 relative gap-10 justify-center"
        >
          <OrderInfomation data={data} register={register} errors={errors} />
          <SubmitInfomation totalPrice={totalPrice} />
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
