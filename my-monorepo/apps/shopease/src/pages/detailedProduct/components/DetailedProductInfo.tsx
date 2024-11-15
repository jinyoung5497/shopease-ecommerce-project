import { useAddCart } from "@/features/cart/hooks/useAddCart";
import { Product } from "@/features/product/api";
import { useSmoothScrollToTop } from "@/shared/hooks/useSmoothScrollToTop";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useToastStore } from "@/store/toast/useToastStore";
import { Button } from "@repo/ui/button/Button";
import { Carousel } from "@repo/ui/carousel/Carousel";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import React from "react";
import { useCallback } from "react";

interface ProductInfo {
  detailedData: Product | undefined;
}

const DetailedProductInfo = React.memo(({ detailedData }: ProductInfo) => {
  const { mutate: addCart } = useAddCart();
  const { user, isSeller } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);
  const scrollToTop = useSmoothScrollToTop();

  const handleCartRegister = useCallback(() => {
    if (!user?.uid) {
      addToast("로그인이 필요한 기능입니다", "error");
      return;
    }
    if (isSeller) {
      addToast("구매자 아이디로 로그인 하세요", "error");
      return;
    }
    if (detailedData?.productQuantity! <= 0) {
      addToast("제품 수량이 부족합니다", "error");
      return;
    }

    if (detailedData) {
      const newProductInCart = {
        productId: detailedData.id,
        sellerId: detailedData.sellerId,
        buyerId: user.uid,
        productName: detailedData.productName,
        productImage: detailedData.productImages?.[0] || "",
        quantity: 1,
        productPrice: detailedData.productPrice,
        totalPrice: detailedData.productPrice,
      };
      addCart(newProductInCart);
    }
    scrollToTop();
  }, [user, isSeller, detailedData, addCart, addToast]);

  return (
    <div className="flex items-center justify-center">
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
    </div>
  );
});

export default DetailedProductInfo;
