import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { LoginRequestDto, LoginResponseDto, RegisterUserReqDTO } from ".";
import { auth, db } from "@/config/firebase";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
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
