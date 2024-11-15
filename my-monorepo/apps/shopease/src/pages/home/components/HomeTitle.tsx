import { useFetchInfiniteProducts } from "@/features/product/hooks/useInfiniteFetchProduct";
import { useNavigation } from "@/shared/hooks/useNavigation";
import { useSmoothScrollToTop } from "@/shared/hooks/useSmoothScrollToTop";
import { Button } from "@repo/ui/button/Button";
import { useState, useCallback } from "react";

const HomeTitle = () => {
  const { navToCategoryProduct } = useNavigation();
  const { fetchNextPage, hasNextPage } = useFetchInfiniteProducts();
  const [hasFetched, setHasFetched] = useState(false);
  const scrollToTop = useSmoothScrollToTop();

  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !hasFetched) {
      fetchNextPage();
      setHasFetched(true);
    }
  }, [fetchNextPage, setHasFetched]);

  const handleAllProductsButtonClick = useCallback(() => {
    navToCategoryProduct();
    scrollToTop();
  }, [navToCategoryProduct, scrollToTop]);

  return (
    <div className="w-full flex items-center justify-center flex-col h-[450px] gap-5 border-b-[1px] border-gray-light">
      <h1 className="text-primary font-semibold text-[50px]">
        Style Made Easy.
      </h1>
      <p className="text-primary w-[550px] text-center">
        당신의 스타일을 완성하는 모든 패션 아이템, 이제 쉽고 빠르게 만나보세요.
        어디서나 간편하게 쇼핑하고, 원하는 스타일을 집까지 바로 받아보세요.
      </p>
      <Button
        onClick={handleAllProductsButtonClick}
        radius="full"
        className="px-[60px]"
        onMouseEnter={handleFetchNextPage}
      >
        All Products
      </Button>
    </div>
  );
};

export default HomeTitle;
