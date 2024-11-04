import HomeButton from "../../shared/layout/HomeButton";
import { Layout } from "../../shared/layout/Layout";
import NavigationBar from "../../shared/layout/NavigationBar";
import { useAddCart } from "@/features/cart/hooks/useAddCart";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useToastStore } from "@/store/toast/useToastStore";
import { Button } from "@/shared/components/button/Button";
import { Carousel } from "@/shared/components/carousel/Carousel";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useFetchDetailedProduct } from "@/features/product/hooks/useFetchDetailedProduct";
import { useParams } from "react-router-dom";
import { useFetchProducts } from "@/features/product/hooks/useFetchProduct";
import { useNavigation } from "@/shared/hooks/useNavigation";
import { useCallback, useMemo } from "react";

const DetailedProduct = () => {
  const { data } = useFetchProducts();
  const { navToDetailedProduct } = useNavigation();
  const { mutate: addCart } = useAddCart();
  const { user, isSeller } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);
  const { id: productId } = useParams<{ id: string }>();

  if (!productId) throw new Error("productId is required");

  const { data: detailedData } = useFetchDetailedProduct(productId);

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
  }, [user, isSeller, detailedData, addCart, addToast]);

  const RecommenedProductCard = useMemo(() => {
    return data
      ?.filter(
        (value) =>
          value.productCategory === detailedData?.productCategory &&
          value.id !== detailedData?.id
      )
      .slice(0, 4)
      .map((value) => (
        <div
          key={value.id}
          onClick={() => navToDetailedProduct(value.id)}
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
          <div className="text-gray text-[12px]">{value.productCategory}</div>
          <div>{value.productName}</div>
          <div>
            {value.productPrice.toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}
          </div>
        </div>
      ));
  }, [data, detailedData]);

  return (
    <Layout>
      <NavigationBar />
      <HomeButton style="absolute top-32 left-10" />
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
          {RecommenedProductCard}
        </div>
      </div>
    </Layout>
  );
};

export default DetailedProduct;
