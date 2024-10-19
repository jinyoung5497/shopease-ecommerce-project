import { db, storage } from "../../config/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { IProduct } from ".";

export const addProductAPI = async (
  product: Omit<IProduct, "id" | "createdAt" | "updatedAt" | "productImage">,
  imageFile: File
): Promise<void> => {
  const productId = uuidv4();
  const imageRef = ref(storage, `products/${productId}/${imageFile.name}`);

  await uploadBytes(imageRef, imageFile);
  const imageUrl = await getDownloadURL(imageRef);

  // Firestore에 제품 데이터 저장
  await setDoc(doc(db, "products", productId), {
    ...product,
    id: productId,
    productImage: imageUrl,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const getProductsAPI = async (): Promise<IProduct[]> => {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const products: IProduct[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as IProduct;
    });

    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

export const deleteProductAPI = async (productId: string): Promise<void> => {
  try {
    const productDocRef = doc(db, "products", productId);
    await deleteDoc(productDocRef);
    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};

export const updateProductAPI = async (
  productId: string,
  updatedData: Partial<IProduct>
): Promise<void> => {
  try {
    const productDocRef = doc(db, "products", productId);

    // productImage가 File 타입일 경우에만 업로드
    if (updatedData.productImage && isFile(updatedData.productImage)) {
      const imageRef = ref(
        storage,
        `products/${productId}/${updatedData.productImage.name}`
      );

      // Firebase Storage에 파일 업로드
      await uploadBytes(imageRef, updatedData.productImage);

      // 업로드된 이미지의 다운로드 URL 가져오기
      const downloadURL = await getDownloadURL(imageRef);

      // Firestore에 이미지 URL 저장
      updatedData.productImage = downloadURL as any; // 이미지 URL을 string으로 저장
    }

    // Firestore에 나머지 데이터 업데이트
    await updateDoc(productDocRef, updatedData);

    console.log("Product updated successfully");
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};

// 타입 가드 함수 생성
function isFile(value: any): value is File {
  return value instanceof File;
}
