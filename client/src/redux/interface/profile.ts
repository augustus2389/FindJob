import { Profile } from "../../api/type/profile";

export interface IProfileState {
  loading: boolean;
  profile: Profile | null;
  status: number | null;
  message: string | null;
}
