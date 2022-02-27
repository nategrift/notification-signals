import { User } from "./NotificationSignalTypes";

export type PostSignupBody = {
  username: string;
  email: string;
  password: string;
};

export type PostLoginBody = {
  username: string;
  password: string;
};

export type NSResponse<T> = {
  ok: boolean;
  data: ErrorObj[] | T;
};

export type AuthSuccessResponse = {
  ok: boolean;
  message: string;
  user: User;
  token: string;
  expireIn: string;
};

export type GetUserSuccessResponse = {
  ok: boolean;
  user: User;
};

export type ErrorObj = {
  value?: string;
  msg: string;
  param: string;
  location?: string;
};
