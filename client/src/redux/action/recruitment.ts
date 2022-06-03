import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IRecruitmentRequest,
  IRecruitmentResponse,
  Recruitment,
} from "../../api/type/recruitment";
import {
  createRecruitmentApi,
  deleteRecruitmentApi,
  getAllRecruitmentApi,
  getAllRecruitmentCreatorApi,
  getAllRecruitmentNotAcceptApi,
  getRecruitmentApi,
  updateRecruitmentAdminApi,
  updateRecruitmentApi,
} from "../../api/recruitment/recruitment";

export const createRecuitmentAction = createAsyncThunk<
  IRecruitmentResponse,
  Recruitment
>("recruitment/create", async (data: Recruitment) => {
  const response = { ...(await createRecruitmentApi(data)) };
  return response;
});

export const updateRecuitmentAction = createAsyncThunk<
  IRecruitmentResponse,
  IRecruitmentRequest
>(
  "recruitment/update",
  async ({ id, updateRecruitment }: IRecruitmentRequest) => {
    const response = {
      ...(await updateRecruitmentApi({ id, updateRecruitment })),
      id,
    };
    return response;
  }
);

export const updateAdminAction = createAsyncThunk(
  "recruitment/updateRecruitmentAdmin",
  async (id: string) => {
    const response = {
      ...(await updateRecruitmentAdminApi(id)),
      id,
    };
    return response;
  }
);
export const getRecuitmentAction = createAsyncThunk(
  "recruitment/get",
  async (id: string) => {
    const response = { ...(await getRecruitmentApi(id)) };
    return response;
  }
);

export const deleteRecuitmentAction = createAsyncThunk(
  "recruitment/delete",
  async (id: string) => {
    const response = { ...(await deleteRecruitmentApi(id)) };
    return response;
  }
);

export const getAllRecuitmentAction = createAsyncThunk(
  "recruitment/getAll",
  async () => {
    const response = { ...(await getAllRecruitmentApi()) };
    return response;
  }
);

export const getAllRecuitmentNotAcceptAction = createAsyncThunk(
  "recruitment/getAllNotAccept",
  async () => {
    const response = { ...(await getAllRecruitmentNotAcceptApi()) };
    return response;
  }
);

export const getAllCreatorAction = createAsyncThunk(
  "recruitment/getAllCreator",
  async () => {
    const response = { ...(await getAllRecruitmentCreatorApi()) };
    return response;
  }
);
