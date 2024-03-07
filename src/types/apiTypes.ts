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

export type {
  UserCookieType,
  JoinInfo,
  LoginInfo,
  UserInfoToUpdate,
};
