import { Product } from "@/features/product/api";
import { useFetchProducts } from "@/features/product/hooks/useFetchProduct";
import { useNavigation } from "@/shared/hooks/useNavigation";
import { useSmoothScrollToTop } from "@/shared/hooks/useSmoothScrollToTop";
import React from "react";

type DetailedProductRecommendType = {
  detailedData: Product | undefined;
};

export const DetailedProductRecommend = React.memo(
  ({ detailedData }: DetailedProductRecommendType) => {
    const { data } = useFetchProducts();
    const { navToDetailedProduct } = useNavigation();
    const scrollToTop = useSmoothScrollToTop();

    return (
      <div className="mx-40">
        <div className="text-primary font-semibold text-3xl text-center">
          Recommended
        </div>
        <div className="flex gap-4 items-start justify-center m-10 mb-20">
          {data
            ?.filter(
              (value) =>
                value.productCategory === detailedData?.productCategory &&
                value.id !== detailedData?.id,
            )
            .slice(0, 4)
            .map((value) => (
              <div
                key={value.id}
                onClick={() => {
                  navToDetailedProduct(value.id);
                  scrollToTop();
                }}
                className="flex flex-col gap-1 relative cursor-pointer w-80"
              >
                <div className="flex items-center justify-center">
                  {value.productImages && value.productImages.length > 0 ? (
                    <img
                      src={value.productImages[0]}
                      alt="productImage"
                      className=""
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
    );
  },
);

export default DetailedProductRecommend;
