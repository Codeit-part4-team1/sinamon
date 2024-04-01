export interface MyInfoRequest {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
}

export interface MyInfoModal {
  success: any;
  fail: any;
  message: string;
}