export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInModal {
  fail: any;
  size: "decide" | "sm" | "md";
  message: string;
}

export interface SignUpRequest {
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

export interface WhatFor {
  whatFor: "login" | "signUp" | "edit";
}