import { IResponse } from "./IResponse";
import { Profile } from "./profile";

export interface ICvResponse extends IResponse {
  result: Cv;
}

export interface ICvsResponse extends IResponse {
  result: Cv[];
}

export interface Cv {
  _id: string;
  profile: Profile;
  recruitment: string;
  writer: string;
  receiver: string;
  status: boolean;
  createdAt: Date;
}
