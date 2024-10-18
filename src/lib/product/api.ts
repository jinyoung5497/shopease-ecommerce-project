import { db, storage } from "../../config/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
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
