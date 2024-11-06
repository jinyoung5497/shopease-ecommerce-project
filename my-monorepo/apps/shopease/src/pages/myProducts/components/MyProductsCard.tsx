import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useFetchInfiniteProducts } from "@/features/product/hooks/useInfiniteFetchProduct";
import { Product } from "@/features/product/api";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useNavigation } from "@/shared/hooks/useNavigation";

const MyProductsCard = () => {
  const { user } = useAuthStore();
  const { data, fetchNextPage, isFetchingNextPage } =
    useFetchInfiniteProducts();
  const { navToDetailedProduct } = useNavigation();

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

  return (
    <div className="relative">
      <div className="grid grid-cols-5 gap-4 items-start justify-items-center mx-40">
        {data?.pages.map((page) =>
          page.products.map((value: Product, index: number) => {
            if (value.sellerId === user?.uid) {
              return (
                <div
                  key={value.id} // id를 키로 사용합니다.
                  className="flex flex-col gap-1 relative cursor-pointer"
                >
                  <UpdateModal index={index} />
                  <DeleteModal id={value.id} />
                  <div className=" w-70 flex items-center justify-center">
                    {value.productImages && value.productImages.length > 0 ? (
                      <img
                        src={value.productImages[0]}
                        alt="productImage"
                        onClick={() => navToDetailedProduct(value.id)}
                        className="w-70"
                      />
                    ) : (
                      <div className="text-center">
                        There are no images for this product
                      </div>
                    )}
                  </div>
                  <div
                    onClick={() => navToDetailedProduct(value.id)}
                    className="text-gray text-[12px]"
                  >
                    {value.productCategory}
                  </div>
                  <div onClick={() => navToDetailedProduct(value.id)}>
                    {value.productName}
                  </div>
                  <div onClick={() => navToDetailedProduct(value.id)}>
                    {value.productPrice.toLocaleString("ko-KR", {
                      style: "currency",
                      currency: "KRW",
                    })}
                  </div>
                </div>
              );
            }
            return null; // 조건이 만족하지 않을 경우 null 반환
          })
        )}
      </div>
      {!isFetchingNextPage ? (
        <div
          ref={ref}
          className="text-center flex items-center justify-center h-10 mt-4 text-white bg-primary absolute bottom-0"
        >
          {isFetchingNextPage ? "Loading more products..." : null}
        </div>
      ) : (
        <div className="text-center flex items-center justify-center h-10 mt-4 text-white bg-primary absolute bottom-0"></div>
      )}
    </div>
  );
};

export default MyProductsCard;
