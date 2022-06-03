import { IResponse } from "./IResponse";

export interface IAuthRequest {
  email: string;
  passWord: string;
}

export interface IAuthUpdatePass {
  oldPass: string;
  newPass: string;
}

export interface IRegisterRequest {
  _id?: string;
  email: string;
  userName: string;
  passWord: string;
  imgUrl: string;
  role: Role;
}

export interface IAuthResponse extends IResponse {
  result: string;
}

export interface IRegisterResponse extends IResponse {
  result: Account;
}

export interface IGetAccountResponse extends IResponse {
  result: Account;
}

export interface IGetAllAccountResponse extends IResponse {
  result: Account[];
}

export interface Account {
  _id?: string;
  email: string;
  userName: string;
  passWord: string;
  imgUrl: string;
  role: Role;
  status?: boolean;
  createdAt?: Date;
}

export enum Role {
  CANDIDATE = "candidate",
  RECRUITER = "recruiter",
  ADMIN = "admin",
}
