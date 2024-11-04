import { db, storage } from "@/app/firebase";
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
import { Product } from ".";

export const addProductAPI = async (
  product: Omit<Product, "id" | "createdAt" | "updatedAt" | "productImages">,
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
  products: Product[];
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
    const products: Product[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Product;
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
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};

export const updateProductAPI = async (
  productId: string,
  updatedData: Partial<Product>,
  imageFiles: File[] = []
): Promise<void> => {
  try {
    const productDocRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productDocRef);

    // 이미지를 업데이트
    if (productSnapshot.exists()) {
      const existingProductData = productSnapshot.data();

      // 기존 이미지 URL 가져오기
      const existingImageUrl = existingProductData.productImageName;

      if (existingImageUrl && Array.isArray(existingImageUrl)) {
        for (const imageURL of existingImageUrl) {
          const imageRef = ref(storage, `products/${productId}/${imageURL}`);
          await deleteObject(imageRef); // 기존 이미지 삭제
        }
      }

      const imageUrls: string[] = [];

      for (const imageFile of imageFiles) {
        const imageRef = ref(
          storage,
          `products/${productId}/${imageFile.name}`
        );
        await uploadBytes(imageRef, imageFile);

        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
      }

      updatedData.productImages = imageUrls as string[]; // 이미지 URL을 string으로 저장

      // Firestore에 나머지 데이터 업데이트
      await updateDoc(productDocRef, updatedData);
    } else {
      console.error("Product does not exist");
    }
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};

export const getProductsAPI = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const products: Product[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Product;
    });

    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

export const getDetailedProductAPI = async (
  productId: string
): Promise<Product | undefined> => {
  try {
    // Firestore의 'products' 컬렉션에서 productId에 해당하는 문서 참조 가져오기
    const productRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productRef);

    // 문서가 존재하는지 확인
    if (productSnapshot.exists()) {
      const data = productSnapshot.data();

      // 데이터 구조를 Product 타입에 맞게 매핑
      const productInfo: Product = {
        id: productSnapshot.id,
        sellerId: data.sellerId,
        productName: data.productName,
        productPrice: data.productPrice,
        productQuantity: data.productQuantity,
        productDescription: data.productDescription,
        productCategory: data.productCategory,
        productImages: data.productImages,
        productImageName: data.productImageName,
        createdAt: data.createdAt.toDate(), // Timestamp 변환
        updatedAt: data.updatedAt.toDate(), // Timestamp 변환
      };

      return productInfo;
    } else {
      console.error("No product found with the specified ID.");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching product: ", error);
    throw error;
  }
};

// 제품 수량 감소 API
export const updateProductQuantity = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  const productRef = doc(db, "products", productId);

  const productSnapshot = await getDoc(productRef);
  if (!productSnapshot.exists()) {
    throw new Error("Product does not exist");
  }

  const currentQuantity = productSnapshot.data().productQuantity;

  // 수량이 충분할 경우에만 업데이트
  if (currentQuantity > 0) {
    await updateDoc(productRef, {
      productQuantity: currentQuantity - quantity,
    });
  } else {
    console.warn("Insufficient quantity to update");
  }
};
