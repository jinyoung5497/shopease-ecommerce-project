type ProductCategoryType =
  | "Men's Clothing"
  | "Women's Clothing"
  | "Sneakers"
  | "Hat"
  | "Kids";

export interface Product {
  id: string;
  sellerId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  productCategory: ProductCategoryType;
  productImages: string[];
  productImageName: string[];
  createdAt: Date;
  updatedAt: Date;
}
