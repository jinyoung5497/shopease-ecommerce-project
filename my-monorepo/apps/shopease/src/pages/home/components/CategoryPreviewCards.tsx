import { Product } from "@/features/product/api/types";
import { useMemo } from "react";

interface CategoryPreviewCardsType {
  category: "Men's Clothing" | "Women's Clothing" | "Sneakers" | "Hat" | "Kids";
  data: Product[] | undefined;
  navToDetailedProduct: (id: string) => void;
}

const CategoryPreviewCards = ({
  category,
  data,
  navToDetailedProduct,
}: CategoryPreviewCardsType) => {
  // 카테고리별로 제품을 필터링하고 메모이제이션
  const filteredProducts = useMemo(() => {
    return data
      ?.filter((value) => value.productCategory === category)
      .slice(0, 5);
  }, [data, category]);

  return (
    <>
      {filteredProducts?.map((value) => (
        <div
          key={value.id}
          onClick={() => navToDetailedProduct(value.id)}
          className="flex flex-col gap-1 relative cursor-pointer"
        >
          <div className="w-72 flex items-center justify-center">
            {value.productImages && value.productImages.length > 0 ? (
              <img
                src={value.productImages[0]}
                alt="productImage"
                className=""
              />
            ) : (
              <div className="text-center">
                No images available for this product
              </div>
            )}
          </div>
          <div className="text-gray text-[12px]">{value.productCategory}</div>
          <div className="overflow-clip">{value.productName}</div>
          <div>
            {value.productPrice.toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryPreviewCards;
