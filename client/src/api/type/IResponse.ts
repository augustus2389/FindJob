export interface IResponse {
  result: object | string | [] | null;
  status: number;
  message: string;
  total: number;
}
