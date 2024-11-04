import { Button } from "@/shared/components/button/Button";
import { Cart } from "@/shared/types/cart/types";

type Props = {
  data: Cart[] | undefined;
};

const SubmitInfomation = ({ data }: Props) => {
  const totalPrice =
    data?.reduce(
      (total, product) => total + product.productPrice * product.quantity,
      0
    ) || 0;

  return (
    <div className="sticky top-10 self-start">
      <div className="border-slate-200 border-[1px] p-5 rounded-t-[5px]">
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-primary text-xl">최종 결제금액</h1>
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
            위 주문 내용을 확인하였으며 결제 관련 서비스 약관에 동의합니다.
          </p>
        </div>
      </div>
      <Button type="submit" full radius="none" className="rounded-b-[5px]">
        결제하기
      </Button>
    </div>
  );
};

export default SubmitInfomation;
