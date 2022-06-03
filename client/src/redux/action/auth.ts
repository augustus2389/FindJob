import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteAccountApi,
  getAccountApi,
  getAccountByAdminApi,
  getAllAccountApi,
  loginApi,
  RegisterApi,
  updateAccountApi,
  updatePassApi,
  updateStatusAccountApi,
} from "../../api/auth/auth";
import {
  Account,
  IAuthRequest,
  IAuthResponse,
  IAuthUpdatePass,
  IRegisterRequest,
  IRegisterResponse,
} from "../../api/type/auth";

export const loginAction = createAsyncThunk<IAuthResponse, IAuthRequest>(
  "auth/login",
  async (data: IAuthRequest) => {
    const response = { ...(await loginApi(data)) };
    return response;
  }
);

export const updatePassAction = createAsyncThunk<
  IRegisterResponse,
  IAuthUpdatePass
>("auth/updatePass", async (data: IAuthUpdatePass) => {
  const response = { ...(await updatePassApi(data)) };
  return response;
});

export const registerAction = createAsyncThunk<
  IRegisterResponse,
  IRegisterRequest
>("auth/register", async (data: IRegisterRequest) => {
  const response = { ...(await RegisterApi(data)) };
  return response;
});

export const getAccountAction = createAsyncThunk(
  "auth/getAccount",
  async () => {
    const response = { ...(await getAccountApi()) };
    return response;
  }
);

export const getAccountByAdminAction = createAsyncThunk(
  "auth/getAccountByAdmin",
  async (id: string) => {
    const response = { ...(await getAccountByAdminApi(id)) };
    return response;
  }
);

export const updateAccountAction = createAsyncThunk(
  "auth/updateAccount",
  async (data: Account) => {
    const response = { ...(await updateAccountApi(data)) };
    return response;
  }
);

export const updateStatusAction = createAsyncThunk(
  "auth/updateStatus",
  async (id: string) => {
    const response = { ...(await updateStatusAccountApi(id)) };
    return response;
  }
);

export const getAllAccountAction = createAsyncThunk(
  "auth/getAllAccount",
  async () => {
    const response = { ...(await getAllAccountApi()) };
    return response;
  }
);

export const deleteAccountAction = createAsyncThunk(
  "auth/deleteAccount",
  async (id: string) => {
    const response = { ...(await deleteAccountApi(id)) };
    return response;
  }
);
