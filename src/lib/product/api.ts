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
  getDoc,
  startAfter,
  limit,
  DocumentData,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { IProduct } from ".";

export const addProductAPI = async (
  product: Omit<IProduct, "id" | "createdAt" | "updatedAt" | "productImages">,
  imageFiles: File[] = [] // 여러 장의 이미지를 받는 배열
): Promise<void> => {
  try {
    // imageFiles가 배열이 맞는지 확인
    if (!Array.isArray(imageFiles)) {
      throw new Error("imageFiles must be an array");
    }

    const productId = uuidv4();
    const imageUrls: string[] = [];

    for (const imageFile of imageFiles) {
      const imageRef = ref(storage, `products/${productId}/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);

      const imageUrl = await getDownloadURL(imageRef);
      imageUrls.push(imageUrl);
    }

    await setDoc(doc(db, "products", productId), {
      ...product,
      id: productId,
      productImages: imageUrls,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("Product successfully added to Firestore with images");
  } catch (error) {
    console.error("Error adding product and images:", error);
    throw new Error("Failed to add product and upload images");
  }
};

const PAGE_SIZE = 10;

// pageParam에 해당하는 마지막 문서를 가져오는 헬퍼 함수
const getLastVisibleDocument = async (
  pageParam: number
): Promise<DocumentData> => {
  const productsRef = collection(db, "products");
  const q = query(
    productsRef,
    orderBy("createdAt", "desc"),
    limit(pageParam) // pageParam 만큼의 문서를 가져와서 마지막 문서를 찾음
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[querySnapshot.docs.length - 1]; // 마지막 문서를 반환
};

// 제품 API를 가져오는 비동기 함수
export const getInfiniteProductsAPI = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<{
  products: IProduct[];
  currentPage: number;
  nextPage: number | null;
}> => {
  try {
    const productsRef = collection(db, "products");
    let q;

    if (pageParam) {
      // pageParam이 있을 경우, 이전 페이지의 마지막 문서 이후의 데이터를 가져옴
      const lastVisible = await getLastVisibleDocument(pageParam); // 마지막 문서를 가져옴
      q = query(
        productsRef,
        orderBy("createdAt", "desc"),
        startAfter(lastVisible), // 마지막 문서 이후로 시작
        limit(PAGE_SIZE)
      );
    } else {
      // 처음에는 첫 페이지 데이터를 가져옴
      q = query(productsRef, orderBy("createdAt", "desc"), limit(PAGE_SIZE));
    }

    const querySnapshot = await getDocs(q);

    // 가져온 문서들을 IProduct 타입으로 변환
    const products: IProduct[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as IProduct;
    });

    // 현재 페이지 이후에 더 많은 제품이 있는지 확인
    const hasMoreProducts = querySnapshot.docs.length === PAGE_SIZE;

    return {
      products,
      currentPage: pageParam,
      nextPage: hasMoreProducts ? pageParam + PAGE_SIZE : null,
    };
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
    const productSnapshot = await getDoc(productDocRef);

    if (productSnapshot.exists()) {
      const existingProductData = productSnapshot.data();

      // 기존 이미지 URL 가져오기
      const existingImageUrl = existingProductData.productImage;

      // 새로운 이미지가 있고 기존에 이미지가 존재할 경우
      if (updatedData.productImages && isFile(updatedData.productImages)) {
        // 기존 이미지가 있을 경우 삭제
        if (existingImageUrl) {
          const imageRef = ref(storage, existingImageUrl);
          await deleteObject(imageRef); // 기존 이미지 삭제
          console.log("Old image deleted from Storage.");
        }

        // 새로운 이미지를 Firebase Storage에 업로드
        const newImageRef = ref(
          storage,
          `products/${productId}/${updatedData.productImages.name}`
        );

        await uploadBytes(newImageRef, updatedData.productImages);

        // 업로드된 이미지의 다운로드 URL 가져오기
        const downloadURL = await getDownloadURL(newImageRef);

        // Firestore에 새로운 이미지 URL 저장
        updatedData.productImages = downloadURL as any; // 이미지 URL을 string으로 저장
      }

      // Firestore에 나머지 데이터 업데이트
      await updateDoc(productDocRef, updatedData);

      console.log("Product updated successfully");
    } else {
      console.error("Product does not exist");
    }
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};

// 타입 가드 함수 생성
function isFile(value: any): value is File {
  return value instanceof File;
}
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
