import { IProduct } from "@/lib/product";
import { useNavigation } from "./useNavigation";
import { useProductStore } from "@/store/product/useProductStore";

export const useDetailedProductInfo = () => {
  const { navToDetailedProduct } = useNavigation();
  const { setIndex, setDetailedProductInfo } = useProductStore();

  const handleProductCardClick = (value: IProduct, index: number) => {
    const stringIndex = index.toString();
    navToDetailedProduct(stringIndex, value.id);
    setIndex(index);
    const detailedProduct = {
      id: value.id,
      productName: value.productName,
      productPrice: value.productPrice,
      productQuantity: value.productQuantity,
      productDescription: value.productDescription,
      productCategory: value.productCategory,
      productImages: value.productImages,
    };
    setDetailedProductInfo(detailedProduct);
  };
  return { handleProductCardClick };
};
