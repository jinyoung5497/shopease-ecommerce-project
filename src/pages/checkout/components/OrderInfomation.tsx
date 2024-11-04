import { Button } from "@/shared/components/button/Button";
import { Input } from "@/shared/components/input/Input";
import { Cart } from "@/shared/types/cart/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const orderSchema = z.object({
  name: z.string().min(1, "주문자명을 입력해주세요."),
  phone: z.string().min(10, "연락처를 정확히 입력해주세요."),
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  postalCode: z.string().min(5, "우편번호를 입력해주세요."),
  address: z.string().min(1, "주소를 입력해주세요."),
});

type FormFields = z.infer<typeof orderSchema>;

type Props = {
  data: Cart[] | undefined;
};

const OrderInfomation = ({ data }: Props) => {
  const {
    register, // 입력 폼과 연결
    formState: { errors }, // 유효성 검사 에러 처리
  } = useForm<FormFields>({
    resolver: zodResolver(orderSchema), // Zod 스키마를 사용한 유효성 검사 적용
  });

  return (
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
            결제완료 이후 품절이 발생한 경우, 영업일 4일 이내 고객님께 별도로
            안내를 드립니다.
          </p>
          <p>
            품절 안내 이후 결제하신 금액은 자동취소 처리해 드리며, 재결제가
            필요한 경우 추가로 안내 드립니다.
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
  );
};

export default OrderInfomation;
