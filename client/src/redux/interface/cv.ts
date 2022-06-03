import { Cv } from "../../api/type/cv";

export interface ICvtState {
  loading: boolean;
  cv: Cv | null;
  cvs: Cv[] | null;
  status: number | null;
  message: string | null;
}
