import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "@firebase/auth";
import {
  GoogleUser,
  LoginRequestDto,
  LoginResponseDto,
  RegisterUserReqDTO,
} from ".";
import { auth, db, googleProvider } from "@/app/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "@firebase/firestore";
import Cookies from "js-cookie";

export const registerAPI = async ({
  name,
  email,
  password,
  isSeller,
}: RegisterUserReqDTO) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  // Firebase Authentication에서 displayName 업데이트
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: name });
  }

  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    isSeller,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return user;
};

export const loginAPI = async (
  loginData: LoginRequestDto
): Promise<LoginResponseDto> => {
  try {
    const { email, password } = loginData;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();

    Cookies.set("accessToken", token, { expires: 7 });

    return {
      uid: user.uid,
      email: user.email ?? "",
      displayName: user.displayName ?? "",
      accessToken: token,
    };
  } catch (error) {
    throw new Error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
  }
};

export const googleLoginAPI = async (
  isSeller: boolean
): Promise<GoogleUser> => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  const user = userCredential.user;

  // Firebase Authentication에서 ID 토큰 가져오기
  const token = await user.getIdToken();
  Cookies.set("accessToken", token, { expires: 7 });

  // Firestore에서 현재 로그인한 유저의 데이터 가져오기
  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);

  // Firestore에 해당 유저 데이터가 있는 경우
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();

    isSeller = userData?.isSeller ?? isSeller; // Firestore에서 isSeller 값 가져오기, 없으면 기본값 사용
  } else {
    // Firestore에 데이터가 없으면 새로운 유저 정보로 저장
    await setDoc(userDocRef, {
      name: user.displayName,
      email: user.email,
      isSeller: isSeller, // 전달받은 isSeller 값 저장
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  // 모든 경로에서 반환 값 처리
  return {
    displayName: user.displayName,
    email: user.email,
    uid: user.uid,
    isSeller, // Firestore에서 가져온 혹은 전달받은 isSeller
  };
};
