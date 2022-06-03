import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCvApi,
  deleteCvApi,
  getStatusFalseCvApi,
  getStatusTrueCvApi,
  updateStatusCvApi,
} from "../../api/cv/cv";

export const createCvAction = createAsyncThunk(
  "cv/create",
  async (id: string) => {
    const response = { ...(await createCvApi(id)) };
    return response;
  }
);

export const getStatusTrueCvAction = createAsyncThunk(
  "cv/getStatusTrue",
  async () => {
    const response = { ...(await getStatusTrueCvApi()) };
    return response;
  }
);

export const getStatusFalseCvAction = createAsyncThunk(
  "cv/getStatusFalse",
  async () => {
    const response = { ...(await getStatusFalseCvApi()) };
    return response;
  }
);

export const updateStatusCvAction = createAsyncThunk(
  "cv/updateStatus",
  async (id: string) => {
    const response = { ...(await updateStatusCvApi(id)) };
    return response;
  }
);

export const deleteCvAction = createAsyncThunk(
  "cv/delete",
  async (id: string) => {
    const response = { ...(await deleteCvApi(id)) };
    return response;
  }
);
