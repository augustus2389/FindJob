import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProfileResponse, Profile } from "../../api/type/profile";
import {
  createProfileApi,
  getProfileApi,
  updateProfileApi,
} from "../../api/profile/profile";

export const createProfileAction = createAsyncThunk<IProfileResponse, Profile>(
  "user/createProfile",
  async (data: Profile) => {
    const response = { ...(await createProfileApi(data)) };
    return response;
  }
);

export const updateProfileAction = createAsyncThunk<IProfileResponse, Profile>(
  "user/updateProfile",
  async (data: Profile) => {
    const response = { ...(await updateProfileApi(data)) };
    return response;
  }
);

export const getProfileAction = createAsyncThunk(
  "user/getProfile",
  async () => {
    const response = { ...(await getProfileApi()) };
    return response;
  }
);
