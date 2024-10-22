export interface ICart {
  productId: string;
  sellerId: string;
  productName: string;
  productImage: File;
  quantity: number;
  productPrice: number;
  totalPrice: number;
}
