import { useFetchCart } from "@/features/cart/hooks/useFetchCart";
import HomeButton from "../common/components/HomeButton";
import { Layout, authStatusType } from "../common/components/Layout";
import NavigationBar from "../common/components/NavigationBar";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useAddOrder } from "@/features/order/hooks/useAddOrder";
import { useDeleteAllCart } from "@/features/cart/hooks/useDeleteCart";
import { useNavigation } from "@/shared/hooks/useNavigation";
import { Button } from "@/shared/components/button/Button";
import { Input } from "@/shared/components/Input/Input";

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
    register, // 입력 폼과 연결
    handleSubmit, // 제출 시 호출되는 함수
    formState: { errors }, // 유효성 검사 에러 처리
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

  const totalPrice =
    data?.reduce(
      (total, product) => total + product.productPrice * product.quantity,
      0
    ) || 0;

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
          <div className="flex flex-col">
            <h1 className="text-primary text-xl w-full border-b-2 border-primary pb-2">
              주문자 정보
            </h1>
            <div className="p-5 flex flex-col gap-3">
              <Input
                {...register("name")}
                type="text"
                placeholder="이름을 입력하세요"
                full
                label="주문자명"
                isError={errors.name}
                errorMessage={errors.name?.message}
                radius="medium"
              />
              <Input
                {...register("phone")}
                type="text"
                placeholder="연락처를 입력하세요"
                full
                label="연락처"
                isError={errors.phone}
                errorMessage={errors.phone?.message}
                radius="medium"
              />
              <Input
                {...register("email")}
                type="text"
                placeholder="이메일을 입력하세요"
                full
                label="이메일"
                isError={errors.email}
                errorMessage={errors.email?.message}
                radius="medium"
              />
            </div>
            <h1 className="text-primary text-xl w-full border-b-2 border-primary pb-2">
              배송지 정보
            </h1>
            <div className="p-5 flex flex-col gap-3">
              <Input
                {...register("postalCode")}
                type="number"
                placeholder="우편번호를 입력하세요"
                full
                label="우편번호"
                isError={errors.postalCode}
                errorMessage={errors.postalCode?.message}
                radius="medium"
              />
              <Input
                {...register("address")}
                type="text"
                placeholder="주소를 입력하세요"
                full
                label="주소"
                isError={errors.address}
                errorMessage={errors.address?.message}
                radius="medium"
              />
            </div>
            <h1 className="text-primary text-xl w-full border-b-2 border-primary pb-2">
              주문상품 정보
            </h1>
            <div className="p-5 flex flex-col gap-5 border-slate-200 border-t-[1px]">
              {data?.map((value, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-5 pt-4 border-slate-200 border-t-[1px]"
                >
                  <div className="flex gap-5">
                    <img
                      src={value.productImage}
                      alt="productImage"
                      className="w-28"
                    />
                    <div className="flex flex-col gap-2">
                      <h2>{value.productName}</h2>
                      <p className="text-sm">{value.quantity}개</p>
                      <p className="font-semibold flex items-center h-full ">
                        {value.productPrice.toLocaleString("ko-KR", {
                          style: "decimal",
                        })}
                        원
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-sm text-slate-400 flex flex-col gap-2 border-slate-200 border-t-[1px] p-3">
                <p>사은품은 주문 상품과 별도로 배송될 수 있습니다.</p>
                <p>
                  결제완료 이후 품절이 발생한 경우, 영업일 4일 이내 고객님께
                  별도로 안내를 드립니다.
                </p>
                <p>
                  품절 안내 이후 결제하신 금액은 자동취소 처리해 드리며,
                  재결제가 필요한 경우 추가로 안내 드립니다.
                </p>
              </div>
            </div>
            <h1 className="text-primary text-xl w-full border-b-2 border-primary">
              결제수단
            </h1>
            <div className="p-5">
              <Button size="xlarge">신용/체크카드</Button>
            </div>
          </div>

          <div className="sticky top-10 self-start">
            <div className="border-slate-200 border-[1px] p-5 rounded-t-[5px]">
              <div className="flex flex-col gap-3">
                <h1 className="font-semibold text-primary text-xl">
                  최종 결제금액
                </h1>
                <div className="flex items-center justify-between">
                  <p className="text-gray">상품 금액</p>
                  <p>
                    {totalPrice.toLocaleString("ko-KR", {
                      style: "decimal",
                    })}
                    원
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray">배송비</p>
                  <p>무료배송</p>
                </div>
                <div className="flex items-center justify-between border-t-[1px] border-slate-200 pt-4">
                  <p>총 할인금액</p>
                  <p>-0원</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>상품 할인</p>
                  <p>0원</p>
                </div>
                <div className="flex items-center justify-between font-semibold text-xl border-y-[1px] border-slate-200 py-4">
                  <h1>총 결제금액</h1>
                  <p>
                    {totalPrice.toLocaleString("ko-KR", {
                      style: "decimal",
                    })}
                    원
                  </p>
                </div>
                <p className="text-sm text-gray-light">
                  위 주문 내용을 확인하였으며 결제 관련 서비스 약관에
                  동의합니다.
                </p>
              </div>
            </div>
            <Button
              type="submit"
              full
              radius="none"
              className="rounded-b-[5px]"
            >
              결제하기
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
