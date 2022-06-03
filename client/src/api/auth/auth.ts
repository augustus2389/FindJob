import { deleteApi, getApi, postApi, putApi } from "../../untils/apiHelper";
import {
  IAuthRequest,
  IAuthResponse,
  IAuthUpdatePass,
  IGetAccountResponse,
  IGetAllAccountResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "../type/auth";

export const loginApi = async ({ email, passWord }: IAuthRequest) => {
  const data = await postApi<IAuthRequest, IAuthResponse>(`/auth/login`, {
    email,
    passWord,
  });
  return data;
};

export const updateAccountApi = async ({
  _id,
  email,
  passWord,
  imgUrl,
  role,
  userName,
}: IRegisterRequest) => {
  const data = await putApi<IRegisterRequest, IRegisterResponse>(
    `/auth/updateAccount?id=${_id}`,
    {
      _id,
      email,
      passWord,
      imgUrl,
      role,
      userName,
    }
  );
  return data;
};

export const updatePassApi = async ({ oldPass, newPass }: IAuthUpdatePass) => {
  const data = await postApi<IAuthUpdatePass, IRegisterResponse>(
    `/auth/updatePass`,
    {
      newPass,
      oldPass,
    }
  );
  return data;
};

export const RegisterApi = async ({
  email,
  passWord,
  userName,
  imgUrl,
  role,
}: IRegisterRequest) => {
  const data = await postApi<IRegisterRequest, IRegisterResponse>(
    `/auth/register`,
    {
      email,
      passWord,
      imgUrl,
      userName,
      role,
    }
  );
  return data;
};

export const getAccountApi = async () => {
  const data = await getApi<IGetAccountResponse>(`/auth/getAccount`);
  return data;
};

export const getAccountByAdminApi = async (id: string) => {
  const data = await getApi<IGetAccountResponse>(
    `/auth/getAccountByAdmin?id=${id}`
  );
  return data;
};

export const getAllAccountApi = async () => {
  const data = await getApi<IGetAllAccountResponse>(`/auth/getAllAccount`);
  return data;
};

export const updateStatusAccountApi = async (id: string) => {
  const data = await getApi<IGetAccountResponse>(
    `/auth/updateStatusAccount?id=${id}`
  );
  return data;
};

export const deleteAccountApi = async (id: string) => {
  const data = await deleteApi<IGetAccountResponse>(
    `/auth/deleteAccount?id=${id}`
  );
  return data;
};
