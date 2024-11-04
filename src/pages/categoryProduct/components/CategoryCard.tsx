import { useFetchProducts } from "@/features/product/hooks/useFetchProduct";
import { useFetchInfiniteProducts } from "@/features/product/hooks/useInfiniteFetchProduct";
import { Product } from "@/features/product/api";
import { useCallback, useEffect } from "react";
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

  return (
    <>
      <div className="grid grid-cols-5 gap-4 items-start justify-items-center mx-20 mb-20">
        {/* 선택된 필터가 없을 때 전체 상품 렌더링 */}
        {selectedFilters.length === 0 &&
          data?.pages.map((page) =>
            page.products.map((value: Product) => renderCategoryCard(value))
          )}

        {/* 필터에 맞는 상품 렌더링 */}
        {filteredData
          ?.filter((value) => {
            return selectedFilters.some(
              (filter) => value.productCategory === categoryMap[filter]
            );
          })
          .map((value: Product) => renderCategoryCard(value))}
      </div>

      {/* 무한 스크롤 로딩 인디케이터 */}
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
