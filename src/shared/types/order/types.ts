export interface Order {
  id?: string;
  sellerId: string;
  buyerId: string;
  productId: string;
  productQuantity: number;
  status: "주문 완료" | "발송 대기" | "발송 시작" | "주문 취소";
  productDetails?: {
    name: string;
    price: number;
    category: string;
    sellerName: string;
    image: string;
  };
}
