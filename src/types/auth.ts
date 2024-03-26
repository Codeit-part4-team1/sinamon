export interface Signin {
  email: string;
  password: string;
}

export interface ValidateSignUp {
  email: string;
  nickname: string;
  password: string; 
  checkPassword: string;
}

export interface SignUp {
  email: string;
  nickname: string;
  password: string; 
}

export interface Modal {
  size: "md" | "sm" | "decide";
  message: string;
}

export interface ErrorModal {
  modal: boolean;
  message: string;
}