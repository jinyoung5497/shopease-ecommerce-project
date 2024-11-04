import { Cart } from "@/shared/types/cart/types";
import { db } from "@/app/firebase";
import {
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";

// 장바구니에 아이템을 추가하는 API 함수 (userId 기준)
export const addCartAPI = async (
  userId: string,
  cartItem: Cart
): Promise<Cart> => {
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
): Promise<Cart[]> => {
  if (!userId) throw new Error("User ID is undefined");

  try {
    const cartCollectionRef = collection(db, "cart", userId, "items");
    const q = query(cartCollectionRef, where("buyerId", "==", userId)); // 사용자별로 cart 필터링
    const querySnapshot = await getDocs(q);

    const cartItems: Cart[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      // Firestore 문서에서 가져온 데이터를 ICart 타입에 맞게 변환
      const cartItem: Cart = {
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

    return cartItems;
  } catch (error) {
    console.error("Error fetching cart: ", error);
    throw new Error("Failed to fetch cart");
  }
};

export const updateCartAPI = async (
  userId: string | undefined,
  data: Cart[],
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
  } catch (error) {
    console.error("Error deleting cart item: ", error);
    throw new Error("Failed to delete cart item");
  }
};

export const deleteAllCartAPI = async (
  userId: string | undefined
): Promise<void> => {
  try {
    if (!userId) {
      throw new Error("User ID is undefined");
    }

    const cartItemsCollectionRef = collection(db, "cart", userId, "items"); // 컬렉션 참조
    const cartItemsQuery = query(cartItemsCollectionRef); // 컬렉션의 모든 문서를 쿼리

    const querySnapshot = await getDocs(cartItemsQuery); // 문서 가져오기

    const batch = writeBatch(db); // Firestore의 배치 생성

    querySnapshot.forEach((docSnapshot) => {
      const docRef = doc(db, "cart", userId, "items", docSnapshot.id); // 각 문서의 참조 가져오기
      batch.delete(docRef); // 문서 삭제
    });

    await batch.commit(); // batch 커밋 (한번에 삭제)
  } catch (error) {
    throw new Error("Failed to empty cart: " + (error as Error).message);
  }
};
