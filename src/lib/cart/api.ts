import { ICart } from "@/store/cart/types";
import { db } from "@/config/firebase";
import { setDoc, doc } from "firebase/firestore";

// 장바구니에 아이템을 추가하는 API 함수
export const addCartAPI = async (cartItem: ICart): Promise<ICart> => {
  try {
    const { productId, ...itemDetails } = cartItem;

    await setDoc(doc(db, "cart", productId), {
      ...itemDetails,
    });

    return cartItem;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to add cart item");
  }
};
