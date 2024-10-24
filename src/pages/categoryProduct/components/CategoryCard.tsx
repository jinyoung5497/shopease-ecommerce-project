import { useDetailedProductInfo } from "@/hooks/useDetailedProductInfo";
import { useFetchProducts } from "@/lib/product/hooks/useFetchProduct";
import { useFetchInfiniteProducts } from "@/lib/product/hooks/useInfiniteFetchProduct";
import { IProduct } from "@/lib/product/types"; // IProduct 타입을 가져옵니다.
import { useFilterStore } from "@/store/filter/useFilterStore";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const CategoryCard = () => {
  const { data, fetchNextPage, isFetchingNextPage } =
    useFetchInfiniteProducts();
  const { data: filteredData } = useFetchProducts();
  const { handleProductCardClick } = useDetailedProductInfo();
  const { men, women, sneakers, hat, kids, isFilterTrue } = useFilterStore();

  // Intersection Observer 설정
  const { ref, inView } = useInView({
    threshold: 0.2, // 10%가 보일 때 감지
    triggerOnce: false, // 여러 번 트리거 가능
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  return (
    <>
      <div className="grid grid-cols-5 gap-4 items-start justify-items-center mx-20 mb-20">
        {(!isFilterTrue || (!men && !women && !sneakers && !hat && !kids)) &&
          data?.pages.map((page) =>
            page.products.map((value: IProduct, index) => (
              <div
                key={value.id} // id를 키로 사용합니다.
                onClick={() => handleProductCardClick(value, index)}
                className="flex flex-col gap-1 relative cursor-pointer mb-10"
              >
                <div className="w-70flex items-center justify-center">
                  {value.productImages && value.productImages.length > 0 ? (
                    <img
                      src={value.productImages[0]}
                      alt="productImage"
                      className="w-70"
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
            ))
          )}
        {isFilterTrue &&
          filteredData
            ?.filter((value) => {
              return (
                (men && value.productCategory === "Men's Clothing") ||
                (women && value.productCategory === "Women's Clothing") ||
                (sneakers && value.productCategory === "Sneakers") ||
                (hat && value.productCategory === "Hat") ||
                (kids && value.productCategory === "Kids")
              );
            })
            .map((value: IProduct, index) => (
              <div
                key={value.id} // id를 키로 사용
                onClick={() => handleProductCardClick(value, index)}
                className="flex flex-col gap-1 relative cursor-pointer mb-10"
              >
                <div className="w-70 flex items-center justify-center">
                  {value.productImages && value.productImages.length > 0 ? (
                    <img
                      src={value.productImages[0]}
                      alt={`${value.productName} image`}
                      className="w-70"
                    />
                  ) : (
                    <div className="text-center">
                      상품 이미지를 찾을 수 없습니다.
                    </div>
                  )}
                </div>

                {/* 상품 정보 */}
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
      <div ref={ref} className="text-center mt-4 text-white bg-primary">
        {isFetchingNextPage ? "Loading more products..." : null}
      </div>
    </>
  );
};

export default CategoryCard;
