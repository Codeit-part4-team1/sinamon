import { ReactNode, useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  UserCookieType,
  // JoinResponse,
  // LoginResponse,
  JoinInfo,
  LoginInfo,
  UserInfoToUpdate,
  cookieCollection
} from "@/types/apiTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextType = {
  userCookie: UserCookieType;
  join: (joinInfo: JoinInfo) => Promise<any>;
  login: (loginInfo: LoginInfo) => Promise<any>;
  logout: () => Promise<void>;
  updateUserInfo: (userInfoToEdit: UserInfoToUpdate) => Promise<any>;
  getCookie: () => cookieCollection;
};

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [isLoggedIn, SetIsLoggedIn] = useState<boolean>(false);

  //필요한 데이터 구조 분해 할당으로 받기.
  const [userCookie, setUserCookie] = useState<UserCookieType>({
    id: null,
    email: null,
    nickname: null,
    profileImageUrl: null,
    accessToken: null,
    refreshToken: null,
    createdAt: null,
    updatedAt: null
  });

  //회원 가입, 성공 시 로그인 페이지 이동
  async function join(joinInfo: JoinInfo) {
    const res = await axios.post(
      "https://sp-globalnomad-api.vercel.app/2-1/users",
      joinInfo
    );

    router.push("/signIn");

    return res;
  }

  //로그인, 성공 시 쿠키, useCookie객체에 리스폰스 데이터 저장 후 메인 페이지 이동
  async function login(loginInfo: LoginInfo) {
    const res = await axios.post(
      "https://sp-globalnomad-api.vercel.app/2-1/auth/login",
      loginInfo
    );

    document.cookie = `id=${res.data.user.id}`;
    document.cookie = `email=${res.data.user.email}`;
    document.cookie = `nickname=${res.data.user.nickname}`;
    document.cookie = `profileImageUrl=${res.data.user.profileImageUrl}`; //"null"(string 타입)
    document.cookie = `createdAt =${res.data.user.createdAt}`;
    document.cookie = `updatedAt = ${res.data.user.updatedAt}`;
    document.cookie = `accessToken=${res.data.accessToken}`; //JWT
    document.cookie = `refreshToken=${res.data.refreshToken}`; //JWT

    setUserCookie((prev) => ({
      ...prev,
      id: res.data.user.id,
      email: res.data.user.email,
      nickname: res.data.user.nickname,
      profileImageUrl: res.data.user.profileImageUrl,
      createdAt: res.data.user.createdAt,
      updatedAt: res.data.user.updatedAt,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken
    }));

    SetIsLoggedIn(true);

    // router.push("/");

    return res;
  }

  //로그아웃, 쿠키 값 삭제
  async function logout() {
    deleteCookie("id");
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("email");
    deleteCookie("nickname");
    deleteCookie("profileImageUrl");
    deleteCookie("createdAt");
    deleteCookie("updatedAt");

    setUserCookie({
      id: null,
      email: null,
      nickname: null,
      profileImageUrl: null,
      accessToken: null,
      refreshToken: null,
      createdAt: null,
      updatedAt: null
    });

    SetIsLoggedIn(false);
  }

  //유저 정보 수정
  async function updateUserInfo(userInfoToEdit: UserInfoToUpdate) {
    const res = await axios.put(
      "https://sp-globalnomad-api.vercel.app/2-1/users/me",
      userInfoToEdit,
      { headers: { Authorization: `Bearer ${userCookie.accessToken}` } }
    );

    deleteCookie("email");
    deleteCookie("nickname");
    deleteCookie("profileImageUrl");
    deleteCookie("updatedAt");

    document.cookie = `email=${res.data.email}`;
    document.cookie = `nickname=${res.data.nickname}`;
    document.cookie = `profileImageUrl=${res.data.profileImageUrl}`;
    document.cookie = `updatedAt=${res.data.updatedAt}`;

    setUserCookie((prev: UserCookieType) => ({
      ...prev,
      email: res.data.email,
      nickname: res.data.nickname,
      profileImageUrl: res.data.profileImageUrl,
      updatedAt: res.data.updatedAt
    }));

    return res;
  }

  //useEffect안에서만 사용
  let getCookie;

  //새로고침시 userCookie값 재할당
  useEffect(() => {
    function getCookieInUseEffect() {
      const cookies = Object.fromEntries(
        document.cookie.split(";").map((cookie) => cookie.trim().split("="))
      );

      setUserCookie(cookies);

      return cookies;
    }

    getCookie = getCookieInUseEffect;

    getCookieInUseEffect();
  }, []);

  //쿠키 값 삭제
  async function deleteCookie(name: string) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  console.log(userCookie);
  console.log(isLoggedIn);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userCookie,
        join,
        login,
        logout,
        updateUserInfo,
        getCookie
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
