import { pageRoutes } from "@/app/apiRoutes";
import { useFetchProducts } from "@/features/product/hooks/useFetchProduct";
import { Button } from "@repo/ui/button/Button";
import { getProductsAPI } from "@/features/product/api/api";
import useThrottledPrefetch from "@/shared/hooks/useThrottledPrefetch";
import { LoadingSkeleton } from "@/shared/layout/LoadingSkeleton";
import React, { Suspense, useCallback } from "react";
import { useSmoothScrollToTop } from "../../../shared/hooks/useSmoothScrollToTop";
import { useNavigation } from "@/shared/hooks/useNavigation";

const HomeCategory = React.memo(() => {
  const { data } = useFetchProducts();
  const { navToFilteredProduct, navToDetailedProduct } = useNavigation();
  const scrollToTop = useSmoothScrollToTop();
  const HomeCategoryCards = React.lazy(() => import("./HomeCategoryCards"));

  const categoryList = [
    "Men's Clothing",
    "Women's Clothing",
    "Sneakers",
    "Hat",
    "Kids",
  ] as const;

  const categoryMap = {
    "Men's Clothing": "men",
    "Women's Clothing": "women",
    Sneakers: "sneakers",
    Hat: "hat",
    Kids: "kids",
  };

  const handleMoreClick = useCallback(
    (
      category:
        | "Men's Clothing"
        | "Women's Clothing"
        | "Sneakers"
        | "Hat"
        | "Kids",
    ) => {
      const categoryKey = categoryMap[category];
      navToFilteredProduct(
        `${pageRoutes.categoryProduct}?filter=${categoryKey}`,
      );
      scrollToTop();
    },
    [navToFilteredProduct],
  );

  const prefetchCategoryProductData = useThrottledPrefetch({
    queryKey: ["categoryProduct"],
    queryFn: getProductsAPI,
    delay: 3000,
  });

  return (
    <div className="m-20 mx-36 gap-20 flex flex-col">
      {categoryList.map((category, index) => (
        <div key={index} className="gap-4 flex flex-col">
          <div className="flex items-center justify-between text-primary">
            <div>{category}</div>
            <Button
              onClick={() => handleMoreClick(category)}
              variant="link"
              size="large"
              onMouseEnter={prefetchCategoryProductData}
            >
              더보기
            </Button>
          </div>
          <Suspense
            fallback={
              <LoadingSkeleton
                numberOfCards={5}
                styles="flex justify-between w-full"
              />
            }
          >
            <HomeCategoryCards
              category={category}
              data={data}
              navToDetailedProduct={navToDetailedProduct}
            />
          </Suspense>
        </div>
      ))}
    </div>
  );
});

export default HomeCategory;
