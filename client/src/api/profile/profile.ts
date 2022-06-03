import { getApi, postApi, putApi } from "../../untils/apiHelper";
import { IProfileResponse, Profile } from "../type/profile";

export const createProfileApi = async ({
  email,
  address,
  branch,
  branchWant,
  endDay,
  firstDay,
  language,
  marry,
  rank,
  salary,
  workForm,
  birthday,
  experience,
  gender,
  schoolName,
  imgUrl,
  name,
  phone,
  skill,
  target,
}: Profile) => {
  const data = await postApi<Profile, IProfileResponse>(`/user/createProfile`, {
    email,
    birthday,
    experience,
    schoolName,
    gender,
    name,
    address,
    branch,
    branchWant,
    endDay,
    firstDay,
    language,
    marry,
    rank,
    salary,
    workForm,
    imgUrl,
    phone,
    skill,
    target,
  });
  return data;
};

export const updateProfileApi = async ({
  email,
  birthday,
  experience,
  imgUrl,
  gender,
  address,
  branch,
  branchWant,
  endDay,
  firstDay,
  language,
  marry,
  rank,
  salary,
  workForm,
  schoolName,
  name,
  phone,
  skill,
  target,
}: Profile) => {
  const data = await putApi<Profile, IProfileResponse>(`/user/updateProfile`, {
    email,
    birthday,
    experience,
    gender,
    schoolName,
    imgUrl,
    address,
    branch,
    branchWant,
    endDay,
    firstDay,
    language,
    marry,
    rank,
    salary,
    workForm,
    name,
    phone,
    skill,
    target,
  });
  return data;
};

export const getProfileApi = async () => {
  const data = await getApi<IProfileResponse>(`/user/getProfile`);
  return data;
};
