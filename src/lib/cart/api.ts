import { ICart } from "@/store/cart/types";
import { db } from "@/config/firebase";
import {
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// 장바구니에 아이템을 추가하는 API 함수 (userId 기준)
export const addCartAPI = async (
  userId: string,
  cartItem: ICart
): Promise<ICart> => {
  try {
    const { productId } = cartItem;

    // 각 사용자의 장바구니에 productId 기준으로 문서를 생성 (userId마다 구분)
    await setDoc(doc(db, "cart", userId, "items", productId), {
      ...cartItem,
    });

    return cartItem;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to add cart item");
  }
};

// Firestore에서 사용자의 cart 데이터를 가져오는 함수
export const getCartAPI = async (
  userId: string | undefined
): Promise<ICart[]> => {
  if (!userId) throw new Error("User ID is undefined");

  try {
    const cartCollectionRef = collection(db, "cart", userId, "items");
    const q = query(cartCollectionRef, where("buyerId", "==", userId)); // 사용자별로 cart 필터링
    const querySnapshot = await getDocs(q);

    const cartItems: ICart[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log(data);

      // Firestore 문서에서 가져온 데이터를 ICart 타입에 맞게 변환
      const cartItem: ICart = {
        productId: data.productId || "",
        sellerId: data.sellerId || "",
        buyerId: userId || "",
        productName: data.productName || "",
        productImage: data.productImage || "",
        quantity: data.quantity || 1,
        productPrice: data.productPrice || 0,
        totalPrice: data.totalPrice || 0,
      };

      return cartItem;
    });

    console.log("Successful fetching cart");
    return cartItems;
  } catch (error) {
    console.error("Error fetching cart: ", error);
    throw new Error("Failed to fetch cart");
  }
};

export const updateCartAPI = async (
  userId: string | undefined,
  data: ICart[],
  quantity: number,
  index: number
): Promise<void> => {
  try {
    if (!userId) throw new Error("User ID is undefined");

    const itemToUpdate = data[index]; // 특정 인덱스의 아이템 선택

    if (!itemToUpdate) throw new Error("Item not found at the provided index");

    // Firestore에서 해당 카트 아이템의 문서 참조
    const cartItemRef = doc(
      db,
      "cart",
      userId,
      "items",
      itemToUpdate.productId
    );

    // quantity와 totalPrice 업데이트
    await updateDoc(cartItemRef, {
      quantity: quantity,
      totalPrice: itemToUpdate.productPrice * quantity,
    });

    console.log("Cart item updated successfully at index:", index);
  } catch (error) {
    console.error("Error updating cart item: ", error);
    throw new Error("Failed to update cart item at the provided index");
  }
};

export const deleteCartItemAPI = async (
  userId: string | undefined,
  productId: string // 삭제할 상품 ID
): Promise<void> => {
  try {
    if (!userId) throw new Error("User ID is undefined");

    // Firestore에서 해당 카트 아이템의 문서 참조
    const cartItemRef = doc(db, "cart", userId, "items", productId);

    // 카트 아이템 삭제
    await deleteDoc(cartItemRef);

    console.log("Cart item deleted successfully");
  } catch (error) {
    console.error("Error deleting cart item: ", error);
    throw new Error("Failed to delete cart item");
  }
};
