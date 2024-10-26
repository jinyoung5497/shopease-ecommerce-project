export interface IProduct {
  id: string;
  sellerId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  productCategory:
    | "Men's Clothing"
    | "Women's Clothing"
    | "Sneakers"
    | "Hat"
    | "Kids";
  productImages: string[];
  productImageName: string[];
  createdAt: Date;
  updatedAt: Date;
}
