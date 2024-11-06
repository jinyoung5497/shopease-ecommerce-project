import { useInfiniteQuery } from "@tanstack/react-query";
import { getInfiniteProductsAPI } from "../api";

export const useFetchInfiniteProducts = () => {
  const {
    data,
    error,
    isLoading,
    fetchNextPage, // 다음 페이지를 가져오는 함수
    isFetchingNextPage, // 다음 페이지를 로딩 중인지 여부
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getInfiniteProductsAPI, // 페이지 매개변수 전달
    initialPageParam: 0, // 초기 페이지 파라미터
    getNextPageParam: (lastPage) => {
      // nextPage 값을 콘솔에 출력
      return lastPage.nextPage;
    },
  });

  return {
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  };
};
