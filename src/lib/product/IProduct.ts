import { ProductCategoryType } from "./types";

export interface IProduct {
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
