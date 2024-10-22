import { useDetailedProductInfo } from "@/hooks/useDetailedProductInfo";
import { useFetchProducts } from "@/lib/product/hooks/useFetchProduct";
import { IProduct } from "@/lib/product/types"; // IProduct 타입을 가져옵니다.
import { useFilterStore } from "@/store/filter/useFilterStore";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const CategoryCard = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useFetchProducts();
  const { handleProductCardClick } = useDetailedProductInfo();
  const { men, women, sneakers, flats, sandals, isFilterTrue } =
    useFilterStore();

  // Intersection Observer 설정
  const { ref, inView } = useInView({
    threshold: 0.1, // 10%가 보일 때 감지
    triggerOnce: false, // 여러 번 트리거 가능
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  return (
    <>
      <div className="grid grid-cols-5 gap-20 items-center justify-items-center mx-40 mb-20">
        {(!isFilterTrue ||
          (!men && !women && !sneakers && !flats && !sandals)) &&
          data?.pages.map((page) =>
            page.products.map((value: IProduct, index) => (
              <div
                key={value.id} // id를 키로 사용합니다.
                onClick={() => handleProductCardClick(value, index)}
                className="flex flex-col gap-1 relative cursor-pointer"
              >
                <div className="border-[1px] border-gray-light rounded-[5px] w-44 h-60 flex items-center justify-center">
                  {value.productImages && value.productImages.length > 0 ? (
                    <img
                      src={value.productImages[0]}
                      alt="productImage"
                      className="w-32 h-32"
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
                <div>$ {value.productPrice}</div>
              </div>
            ))
          )}
        {isFilterTrue &&
          data?.pages.map((page) =>
            page.products
              .filter((value) => {
                return (
                  (men && value.productCategory == "Men's Clothing") ||
                  (women && value.productCategory == "Women's Clothing") ||
                  (sneakers && value.productCategory == "Sneakers") ||
                  (flats && value.productCategory == "Flats") ||
                  (sandals && value.productCategory == "Sandals")
                );
              })
              .map((value: IProduct, index) => (
                <div
                  key={value.id} // id를 키로 사용합니다.
                  onClick={() => handleProductCardClick(value, index)}
                  className="flex flex-col gap-1 relative cursor-pointer"
                >
                  <div className="border-[1px] border-gray-light rounded-[5px] w-44 h-60 flex items-center justify-center">
                    {value.productImages && value.productImages.length > 0 ? (
                      <img
                        src={value.productImages[0]}
                        alt="productImage"
                        className="w-32 h-32"
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
                  <div>$ {value.productPrice}</div>
                </div>
              ))
          )}
      </div>
      <div ref={ref} className="text-center mt-4 text-white bg-primary">
        {isFetchingNextPage ? "Loading more products..." : null}
      </div>
    </>
  );
};

export default CategoryCard;
