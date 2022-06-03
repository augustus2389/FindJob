import { deleteApi, getApi, postApi, putApi } from "../../untils/apiHelper";
import {
  IRecruitmentArrayResponse,
  IRecruitmentRequest,
  IRecruitmentResponse,
  Recruitment,
} from "../type/recruitment";

export const createRecruitmentApi = async ({
  address,
  description,
  phone,
  imgUrl,
  deadline,
  degree,
  gender,
  salary,
  title,
  type,
  contact,
  quantity,
  rank,
  workExperience,
  workingForm,
}: Recruitment) => {
  const data = await postApi<Recruitment, IRecruitmentResponse>(
    `/recruitment/create`,
    {
      address,
      description,
      phone,
      salary,
      imgUrl,
      deadline,
      degree,
      gender,
      title,
      contact,
      type,
      quantity,
      rank,
      workExperience,
      workingForm,
    }
  );
  return data;
};

export const updateRecruitmentApi = async ({
  id,
  updateRecruitment,
}: IRecruitmentRequest) => {
  const data = await putApi<Recruitment, IRecruitmentResponse>(
    `/recruitment/update?id=${id}`,
    updateRecruitment
  );
  return data;
};

export const updateRecruitmentAdminApi = async (id: string) => {
  const data = await deleteApi<IRecruitmentResponse>(
    `/recruitment/updateRecruitmentAdmin?id=${id}`
  );
  return data;
};

export const deleteRecruitmentApi = async (id: string) => {
  const data = await deleteApi<IRecruitmentResponse>(
    `/recruitment/delete?id=${id}`
  );
  return data;
};

export const getRecruitmentApi = async (id: string) => {
  const data = await getApi<IRecruitmentResponse>(`/recruitment/get?id=${id}`);
  return data;
};

export const getAllRecruitmentApi = async () => {
  const data = await getApi<IRecruitmentArrayResponse>(`/recruitment/getAll`);
  return data;
};

export const getAllRecruitmentNotAcceptApi = async () => {
  const data = await getApi<IRecruitmentArrayResponse>(
    `/recruitment/getAllNotAccept`
  );
  return data;
};

export const getAllRecruitmentCreatorApi = async () => {
  const data = await getApi<IRecruitmentArrayResponse>(
    `/recruitment/getAllCreator`
  );
  return data;
};
