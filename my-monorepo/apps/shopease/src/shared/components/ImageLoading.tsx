import { Product } from "@/features/product/api";
import { useState } from "react";

const ImageLoading = ({ value }: { value: Product }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full rounded-[5px] bg-slate-100 overflow-hidden flex h-[420px]">
      {/* Placeholder (shows only if image hasn't loaded yet) */}
      {!isLoaded && (
        <div className="h-auto w-full flex items-center justify-center bg-slate-100">
          <div className="text-slate-200">Loading...</div>
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
  );
};

export default ImageLoading;
