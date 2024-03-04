type UserCookieType = {
  id: number | null;
  email: string | null;
  nickname: string | null;
  profileImageUrl: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

// type JoinResponse = {
//   id: number;
//   email: string;
//   nickname: string;
//   profileImageUrl: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type LoginResponse = {
//   id: number;
//   email: string;
//   nickname: string;
//   profileImageUrl: string;
//   createdAt: string;
//   updatedAt: string;
//   refreshToken: string;
//   accessToken: string;
// };

type JoinInfo = {
  email: string;
  nickname: string;
  password: string;
};

type LoginInfo = {
  email: string;
  password: string;
};

type UserInfoToUpdate = {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
};

type cookieCollection = {
  accessToken?: string;
  refreshToken?: string;
  email?: string;
  nickname?: string;
  profileImageUrl?: string;
};

export type {
  UserCookieType,
  // JoinResponse,
  // LoginResponse,
  JoinInfo,
  LoginInfo,
  UserInfoToUpdate,
  cookieCollection
};