import { Product } from "@/features/product/api/types";
import { DeferredComponent } from "@/shared/layout/DeferredComponent";
import React from "react";
import { useMemo, useState } from "react";

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

    const ImageLoading = ({ value }: { value: Product }) => {
      const [isLoaded, setIsLoaded] = useState(false);

      return (
        <DeferredComponent>
          <div className="w-full rounded-[5px] bg-slate-100 overflow-hidden relative">
            {/* Placeholder (shows only if image hasn't loaded yet) */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                <span className="text-slate-200">Loading...</span>{" "}
              </div>
            )}

            {/* Image with fade-in effect */}
            {value.productImages && value.productImages.length > 0 ? (
              <img
                src={value.productImages[0]}
                alt="productImage"
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                No images available for this product
              </div>
            )}
          </div>
        </DeferredComponent>
      );
    };

    return (
      <>
        {filteredProducts?.map((value) => (
          <div
            key={value.id}
            onClick={() => navToDetailedProduct(value.id)}
            className="flex flex-col gap-1 relative cursor-pointer w-80"
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
      </>
    );
  },
);

export default CategoryPreviewCards;
