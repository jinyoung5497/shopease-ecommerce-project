import {
  collection,
  getDocs,
  query,
  where,
  documentId,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { Order } from "@/shared/types/order/types";
import { db } from "@/app/firebase";
import { v4 as uuidv4 } from "uuid";

export const addOrderAPI = async (order: Order) => {
  const ordersRef = collection(db, "orders"); // 'orders' 컬렉션 참조
  const orderId = uuidv4(); // 고유한 주문 ID 생성

  // Firestore에 새로운 주문 추가
  const docRef = doc(ordersRef, orderId); // 생성한 orderId로 문서 참조 생성
  await setDoc(docRef, { ...order, id: orderId }); // 주문 정보와 ID를 포함하여 문서 추가

  return { id: orderId, ...order }; // Firestore 문서 ID와 주문 정보 반환
};

export const fetchOrderAPI = async (
  userId: string | undefined
): Promise<Order[]> => {
  if (!userId) throw new Error("User ID is undefined");

  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("buyerId", "==", userId));
    const querySnapshot = await getDocs(q);

    const orderItems: Order[] = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();

        const orderItem: Order = {
          id: data.id,
          productId: data.productId || "",
          sellerId: data.sellerId || "",
          buyerId: userId || "",
          productQuantity: data.quantity || 1,
          status: data.status,
        };

        // 제품 정보를 가져오는 추가 로직
        const productRef = collection(db, "products"); // 제품 컬렉션 참조
        const productQuery = query(
          productRef,
          where("id", "==", orderItem.productId)
        );
        const productSnapshot = await getDocs(productQuery);

        const userRef = collection(db, "users");
        const userQuery = query(
          userRef,
          where(documentId(), "==", orderItem.sellerId)
        );
        const userSnapshot = await getDocs(userQuery);
        const userData = userSnapshot.docs[0].data();

        if (!productSnapshot.empty) {
          const productData = productSnapshot.docs[0].data();
          // 주문 항목에 제품 정보를 추가할 수 있습니다.
          return {
            ...orderItem,
            productDetails: {
              name: productData.productName,
              price: productData.productPrice,
              sellerName: userData?.name,
              category: productData.productCategory,
              image: productData.productImages[0],
            },
          };
        }

        return orderItem; // 제품 정보가 없을 경우 기본 주문 항목 반환
      })
    );

    return orderItems;
  } catch (error) {
    console.error("Error fetching order: ", error);
    throw new Error("Failed to fetch order");
  }
};

// 주문의 status를 업데이트하는 함수
export const updateOrderStatus = async (
  userId: string,
  orderId: string,
  newStatus: string
) => {
  if (!userId || !orderId) throw new Error("User ID or Order ID is undefined");

  try {
    // Firestore에서 특정 주문 문서를 참조
    const orderRef = doc(db, "orders", orderId);

    // status 필드를 업데이트
    await updateDoc(orderRef, { status: newStatus });

    return { success: true, message: "Order status updated successfully" };
  } catch (error) {
    console.error("Error updating order status: ", error);
    throw new Error("Failed to update order status");
  }
};

export const fetchAdminAPI = async (
  sellerId: string | undefined
): Promise<Order[]> => {
  if (!sellerId) throw new Error("User ID is undefined");

  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("sellerId", "==", sellerId));
    const querySnapshot = await getDocs(q);

    const orderItems: Order[] = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();

        const orderItem: Order = {
          id: data.id,
          productId: data.productId || "",
          sellerId: data.sellerId || "",
          buyerId: data.buyerId || "",
          productQuantity: data.quantity || 1,
          status: data.status,
        };

        // 제품 정보를 가져오는 추가 로직
        const productRef = collection(db, "products"); // 제품 컬렉션 참조
        const productQuery = query(
          productRef,
          where("id", "==", orderItem.productId)
        );
        const productSnapshot = await getDocs(productQuery);

        const userRef = collection(db, "users");
        const userQuery = query(
          userRef,
          where(documentId(), "==", orderItem.sellerId)
        );
        const userSnapshot = await getDocs(userQuery);
        const userData = userSnapshot.docs[0].data();

        if (!productSnapshot.empty) {
          const productData = productSnapshot.docs[0].data();
          // 주문 항목에 제품 정보를 추가할 수 있습니다.
          return {
            ...orderItem,
            productDetails: {
              name: productData.productName,
              price: productData.productPrice,
              category: productData.productCategory,
              sellerName: userData?.name,
              image: productData.productImages[0],
            },
          };
        }

        return orderItem; // 제품 정보가 없을 경우 기본 주문 항목 반환
      })
    );

    return orderItems;
  } catch (error) {
    console.error("Error fetching order: ", error);
    throw new Error("Failed to fetch order");
  }
};
