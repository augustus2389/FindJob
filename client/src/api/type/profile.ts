import { IResponse } from "./IResponse";
import { Rank, Salary, Type, WorkingForm } from "./recruitment";

export interface Profile {
  name: string;
  birthday: string;
  phone: string;
  address: string;
  email: string;
  imgUrl: string;
  schoolName: string;
  experience: string;
  skill: string;
  target: string;
  gender: Sex;
  firstDay: string;
  endDay: string;
  branch: Type;
  language: string;
  marry: Marry;
  salary: Salary;
  rank: Rank;
  workForm: WorkingForm;
  branchWant: Type;
  createdAt?: Date;
}

export interface IProfileResponse extends IResponse {
  result: Profile;
}

export enum Sex {
  NAM = "Nam",
  NU = "Nữ",
}

export enum Marry {
  OK = "Độc thân",
  NO = "Đã kết hôn",
}
