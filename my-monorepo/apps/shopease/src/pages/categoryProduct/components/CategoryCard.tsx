import { useFetchProducts } from "@/features/product/hooks/useFetchProduct";
import { useFetchInfiniteProducts } from "@/features/product/hooks/useInfiniteFetchProduct";
import { Product } from "@/features/product/api";
import { useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";
import { useNavigation } from "@/shared/hooks/useNavigation";

const CategoryCard = () => {
  const { data, fetchNextPage, isFetchingNextPage } =
    useFetchInfiniteProducts();
  const { data: filteredData } = useFetchProducts();
  const { navToDetailedProduct } = useNavigation();
  const [searchParams] = useSearchParams();

  type CategoryMapType = keyof typeof categoryMap;

  const categoryMap = {
    men: "Men's Clothing",
    women: "Women's Clothing",
    sneakers: "Sneakers",
    hat: "Hat",
    kids: "Kids",
  } as const;

  const selectedFilters: CategoryMapType[] = searchParams.getAll(
    "filter"
  ) as CategoryMapType[];

  // Intersection Observer 설정
  const { ref, inView } = useInView({
    threshold: 0.1, // 10%가 보일 때 감지
    triggerOnce: false, // 여러 번 트리거 가능
  });

  useEffect(() => {
    if (inView) {
      try {
        fetchNextPage();
      } catch (error) {
        console.error("Error fetching next page: ", error);
      }
    }
  }, [fetchNextPage, inView]);

  const renderCategoryCard = useCallback(
    (value: Product) => {
      return (
        <div
          key={value.id} // id를 키로 사용
          onClick={() => navToDetailedProduct(value.id)}
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
              <div className="text-center">상품 이미지를 찾을 수 없습니다.</div>
            )}
          </div>

          {/* 상품 정보 */}
          <div className="text-gray text-[12px]">{value.productCategory}</div>
          <div>{value.productName}</div>
          <div>
            {value.productPrice.toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}
          </div>
        </div>
      );
    },
    [navToDetailedProduct]
  );

  // 필터링된 데이터를 메모이제이션
  const filteredProducts = useMemo(() => {
    if (selectedFilters.length === 0) {
      return data?.pages.flatMap((page) => page.products) || [];
    }
    return (
      filteredData?.filter((value) =>
        selectedFilters.some(
          (filter) => value.productCategory === categoryMap[filter]
        )
      ) || []
    );
  }, [selectedFilters, data, filteredData, categoryMap]);

  return (
    <>
      <div className="grid grid-cols-5 gap-4 items-start justify-items-center mx-20 mb-20">
        {filteredProducts.map((value: Product) => renderCategoryCard(value))}
      </div>

      <div
        ref={ref}
        className="text-center flex items-center justify-center h-10 mt-4 text-white bg-primary"
      >
        {isFetchingNextPage ? "Loading more products..." : null}
      </div>
    </>
  );
};

export default CategoryCard;
