import { ReactNode, useState, useEffect, createContext } from "react";
import axios from "axios";
import {
  UserCookieType,
  // JoinResponse,
  // LoginResponse,
  JoinInfo,
  LoginInfo,
  UserInfoToUpdate,
  // cookieCollection
} from "@/types/apiTypes";

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextType = {
  isLoggedIn: boolean;
  userCookie: UserCookieType;
  join: (joinInfo: JoinInfo) => Promise<any>;
  login: (loginInfo: LoginInfo) => Promise<any>;
  logout: () => Promise<void>;
  updateUserInfo: (userInfoToEdit: UserInfoToUpdate) => Promise<any>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
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

  //회원 가입, 리스폰스 객체 반환
  async function join(joinInfo: JoinInfo) {
    try {
      const res = await axios.post(
        "https://sp-globalnomad-api.vercel.app/2-1/users",
        joinInfo
      );
  
      return res;
    } catch(error) {
      return error;
    }
  }

  //로그인, 리스폰스 객체 반환, 로그인 성공 시 쿠키 탭에 쿠키 저장, userCookie에 값 할당, isLoggedIn값 true 할당
  async function login(loginInfo: LoginInfo) {
    try {
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

      return res;
    } catch (error) {
      return error;
    }
  }

  //로그아웃, 쿠키 값 삭제, useCookie 값 초기화, isLoggedIn 값 false 할당
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

  //유저 정보 수정, 리스폰스 객체 반환, 수정된 정보로 쿠키 값, useCookie 값 변경
  async function updateUserInfo(userInfoToEdit: UserInfoToUpdate) {
    try {
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
    } catch(error) {
      return error;
    }
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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userCookie,
        join,
        login,
        logout,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
