import { Product } from "@/features/product/api/types";
import React from "react";
import { useMemo } from "react";
import ImageLoading from "../../../shared/components/ImageLoading";

interface CategoryPreviewCardsType {
  category: "Men's Clothing" | "Women's Clothing" | "Sneakers" | "Hat" | "Kids";
  data: Product[] | undefined;
  navToDetailedProduct: (id: string) => void;
}

const CategoryPreviewCards = React.memo(
  ({ category, data, navToDetailedProduct }: CategoryPreviewCardsType) => {
    const filteredProducts = useMemo(() => {
      return data
        ?.filter((value) => value.productCategory === category)
        .slice(0, 5);
    }, [data, category]);

    return (
      <div className="flex gap-5">
        {filteredProducts?.map((value) => (
          <div
            key={value.id}
            onClick={() => navToDetailedProduct(value.id)}
            className="flex flex-col gap-1 cursor-pointer w-80"
          >
            <ImageLoading value={value} />
            <div className="text-gray text-[12px]">{value.productCategory}</div>
            <div className="">{value.productName}</div>
            <div>
              {value.productPrice.toLocaleString("ko-KR", {
                style: "currency",
                currency: "KRW",
              })}
            </div>
          </div>
        ))}
      </div>
    );
  },
);

export default CategoryPreviewCards;
