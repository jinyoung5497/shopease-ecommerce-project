import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useFetchProducts } from "@/lib/product/hooks/useFetchProduct";
import { IProduct } from "@/lib/product/types";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const MyProductsCard = () => {
  const { user } = useAuthStore();
  const { data, fetchNextPage, isFetchingNextPage } = useFetchProducts();

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
    <div className="grid grid-cols-5 gap-20 items-center justify-items-center mx-40">
      {data?.pages.map((page) =>
        page.products.map((value: IProduct, index: number) => {
          if (value.sellerId === user?.uid) {
            return (
              <div
                key={value.id} // id를 키로 사용합니다.
                className="flex flex-col gap-1 relative cursor-pointer"
              >
                <UpdateModal index={index} />
                <DeleteModal id={value.id} />
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
            );
          }
          return null; // 조건이 만족하지 않을 경우 null 반환
        })
      )}
      <div ref={ref} className="text-center mt-4 text-white bg-primary">
        {isFetchingNextPage ? "Loading more products..." : null}
      </div>
    </div>
  );
};

export default MyProductsCard;
