import { Recruitment } from "../../api/type/recruitment";

export interface IRecruitmentState {
  loading: boolean;
  recruitment: Recruitment | null;
  recruitments: Recruitment[] | null;
  filterdata: Recruitment[] | null;
  status: number | null;
  message: string | null;
  total: number;
}
