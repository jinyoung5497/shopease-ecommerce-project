import HomeButton from "../common/components/HomeButton";
import { Layout } from "../common/components/Layout";
import NavigationBar from "../common/components/NavigationBar";
import { useProductStore } from "@/store/product/useProductStore";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { useDetailedProductInfo } from "@/hooks/useDetailedProductInfo";
import { useAddCart } from "@/lib/cart/hooks/useAddCart";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useFetchProducts } from "@/lib/product/hooks/useFetchProduct";
import { useNavigation } from "@/hooks/useNavigation";
import { useToastStore } from "@/store/toast/useToastStore";
import { Button } from "@/packages/button/Button";

const DetailedProduct = () => {
  const { detailedProductInfo } = useProductStore();
  const { data } = useFetchProducts();
  const { handleProductCardClick } = useDetailedProductInfo();
  const { mutate: addCart } = useAddCart();
  const { user, isSeller } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const { navToHome } = useNavigation();

  if (!detailedProductInfo.id) {
    navToHome();
  }

  const handleCartRegister = () => {
    if (user?.uid && !isSeller) {
      const newProductInCart = {
        productId: detailedProductInfo.id || "",
        sellerId: detailedProductInfo.sellerId || "",
        buyerId: user?.uid || "",
        productName: detailedProductInfo.productName || "",
        productImage:
          (detailedProductInfo.productImages &&
            detailedProductInfo.productImages[0]) ||
          "",
        quantity: 1,
        productPrice: detailedProductInfo.productPrice || 0,
        totalPrice: detailedProductInfo.productPrice || 0,
      };
      if (detailedProductInfo.productQuantity! > 0) {
        addCart(newProductInCart);
      } else {
        addToast("제품 수량이 부족합니다", "error");
      }
    } else {
      addToast("로그인이 필요한 기능입니다", "error");
    }
    if (isSeller) {
      addToast("구매자 아이디로 로그인 하세요", "error");
    }
  };

  return (
    <Layout>
      <NavigationBar />
      <HomeButton style="absolute top-32 left-10" />
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center gap-28 m-40 w-3/5  ">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {detailedProductInfo?.productImages?.map((value, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img src={value} alt="productImage" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex flex-col gap-5 w-4/5 h-full ">
            <div className="text-primary font-semibold text-3xl">
              {detailedProductInfo.productName}
            </div>
            <div className="font-semibold">
              {detailedProductInfo.productPrice?.toLocaleString("ko-KR", {
                style: "currency",
                currency: "KRW",
              })}
            </div>
            <div>{detailedProductInfo.productQuantity}개 남았습니다</div>
            <div
              className="overflow-y-scroll  h-[400px]"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {detailedProductInfo.productDescription}
            </div>
            <Button
              onClick={handleCartRegister}
              radius="medium"
              className="mt-2"
            >
              장바구니 추가
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-40">
        <div className="text-primary font-semibold text-3xl text-center">
          Recommended
        </div>
        <div className="flex gap-4 items-center justify-center m-10 mb-20">
          {data
            ?.filter(
              (value) =>
                value.productCategory === detailedProductInfo.productCategory &&
                value.id !== detailedProductInfo.id
            )
            .slice(0, 4)
            .map((value, index) => (
              <div
                key={value.id}
                onClick={() => handleProductCardClick(value, index)}
                className="flex flex-col gap-1 relative cursor-pointer"
              >
                <div className="flex items-center justify-center">
                  {value.productImages && value.productImages.length > 0 ? (
                    <img
                      src={value.productImages[0]}
                      alt="productImage"
                      className="w-80"
                    />
                  ) : (
                    <div className="text-center">
                      There are no images for this product
                    </div>
                  )}
                </div>
                <div className="text-gray text-[12px]">
                  {value.productCategory}
                </div>
                <div>{value.productName}</div>
                <div>
                  {value.productPrice.toLocaleString("ko-KR", {
                    style: "currency",
                    currency: "KRW",
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default DetailedProduct;
