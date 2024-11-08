import { Product } from "@/features/product/api";
import { Button } from "@repo/ui/button/Button";
import { Carousel } from "@repo/ui/carousel/Carousel";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

interface ProductInfo {
  detailedData: Product | undefined;
  handleCartRegister: () => void;
}

const ProductInfo = ({ detailedData, handleCartRegister }: ProductInfo) => {
  return (
    <div className="flex items-center justify-center gap-28 m-40 w-3/5  ">
      {detailedData?.productImages && (
        <Carousel.Root>
          <Carousel.Previous images={detailedData.productImages}>
            <ArrowBigLeft />
          </Carousel.Previous>
          <Carousel.Content>
            <Carousel.Items images={detailedData.productImages} />
          </Carousel.Content>
          <Carousel.Next images={detailedData.productImages}>
            <ArrowBigRight />
          </Carousel.Next>
        </Carousel.Root>
      )}
      <div className="flex flex-col gap-5 w-4/5 h-full ">
        <div className="text-primary font-semibold text-3xl">
          {detailedData?.productName}
        </div>
        <div className="font-semibold">
          {detailedData?.productPrice?.toLocaleString("ko-KR", {
            style: "currency",
            currency: "KRW",
          })}
        </div>
        <div>{detailedData?.productQuantity}개 남았습니다</div>
        <div
          className="overflow-y-scroll  h-[400px]"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {detailedData?.productDescription}
        </div>
        <Button onClick={handleCartRegister} radius="medium" className="mt-2">
          장바구니 추가
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
