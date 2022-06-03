import { deleteApi, getApi } from "../../untils/apiHelper";
import { ICvResponse, ICvsResponse } from "../type/cv";

export const createCvApi = async (id: string) => {
  const data = await getApi<ICvResponse>(`/cv/create?id=${id}`);
  return data;
};

export const getStatusTrueCvApi = async () => {
  const data = await getApi<ICvsResponse>(`/cv/getStatusTrue`);
  return data;
};

export const getStatusFalseCvApi = async () => {
  const data = await getApi<ICvsResponse>(`/cv/getStatusFalse`);
  return data;
};

export const updateStatusCvApi = async (id: string) => {
  const data = await getApi<ICvResponse>(`/cv/updateStatus?id=${id}`);
  return data;
};

export const deleteCvApi = async (id: string) => {
  const data = await deleteApi<ICvResponse>(`/cv/delete?id=${id}`);
  return data;
};
