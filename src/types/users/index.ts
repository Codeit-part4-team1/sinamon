export interface WhatFor {
  whatFor: "login" | "signUp" | "edit";
}

export interface MyInfoField {
  nickname: string;
  email: string;
  profileImageURL: string;
  newPassword: string;
  checkPassword: string;
}

export interface MyInfoValue {
  nickname: string;
  profileImageURL: string;
  newPassword: string;
}

export interface MyInfoModal {
  modal: any;
  message: string;
}
