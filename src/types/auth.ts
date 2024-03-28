export interface WhatFor {
  whatFor: "login" | "signUp" | "edit";
}

export interface SignInValue {
  email: string;
  password: string;
}

export interface SignInModal {
  fail: any;
  size: "md" | "sm" | "decide";
  message: string;
}

export interface SignUpField {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
}

export interface SignUpValue {
  email: string;
  nickname: string;
  password: string;
}

export interface SignUpModal {
  success: any;
  fail: any;
  size: "md" | "sm" | "decide";
  message: string;
}
