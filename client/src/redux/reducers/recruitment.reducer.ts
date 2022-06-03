import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  createRecuitmentAction,
  deleteRecuitmentAction,
  getAllCreatorAction,
  getAllRecuitmentAction,
  getAllRecuitmentNotAcceptAction,
  getRecuitmentAction,
  updateAdminAction,
  updateRecuitmentAction,
} from "../action/recruitment";
import { IRecruitmentState } from "../interface/recruitment";
import { RootState } from "../store";

const initialState: IRecruitmentState = {
  loading: false,
  recruitment: null,
  recruitments: null,
  filterdata: null,
  total: 0,
  status: null,
  message: null,
};

const recruitmentSlice = createSlice({
  name: "recruitment",
  initialState,
  reducers: {
    setStatusRecruitment: (state) => {
      state.status = null;
    },
    setMessageRecruitment: (state) => {
      state.message = null;
    },
    setCruitment: (state) => {
      state.recruitment = null;
    },
    setCruitments: (state) => {
      state.recruitments = null;
    },
    setTotalRecruitment: (state) => {
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRecuitmentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRecuitmentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.recruitments = action.payload.result;
      })
      .addCase(getAllRecuitmentAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(getAllRecuitmentNotAcceptAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRecuitmentNotAcceptAction.fulfilled, (state, action) => {
        state.loading = false;
        state.recruitments = action.payload.result;
      })
      .addCase(getAllRecuitmentNotAcceptAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(getAllCreatorAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCreatorAction.fulfilled, (state, action) => {
        state.loading = false;
        state.recruitments = action.payload.result;
        state.filterdata = state.recruitments.map((item, index) => {
          return { ...item, id: index + 1 };
        });
        state.total = action.payload.total;
      })
      .addCase(getAllCreatorAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(createRecuitmentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRecuitmentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.recruitment = action.payload.result;
        if (action.payload.status === 200) {
          state.recruitments?.push(action.payload.result);
        }
      })
      .addCase(createRecuitmentAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(updateRecuitmentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRecuitmentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.recruitment = action.payload.result;
        state.recruitments = state.recruitments!.map((recruitment) => {
          if (recruitment._id === action.payload.result._id) {
            recruitment.address = action.payload.result.address;
            recruitment.description = action.payload.result.description;
            recruitment.title = action.payload.result.title;
            recruitment.phone = action.payload.result.phone;
            recruitment.rank = action.payload.result.rank;
            recruitment.salary = action.payload.result.salary;
            recruitment.quantity = action.payload.result.quantity;
            recruitment.type = action.payload.result.type;
            recruitment.contact = action.payload.result.contact;
            recruitment.workExperience = action.payload.result.workExperience;
            recruitment.workingForm = action.payload.result.workingForm;
            recruitment.gender = action.payload.result.gender;
            recruitment.degree = action.payload.result.degree;
            recruitment.deadline = action.payload.result.deadline;
          }
          return recruitment;
        });
      })
      .addCase(updateRecuitmentAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(updateAdminAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAdminAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.recruitment = action.payload.result;
        state.recruitments = state.recruitments!.map((recruitment) => {
          if (recruitment._id === action.payload.result._id) {
            recruitment.status = action.payload.result.status;
          }
          return recruitment;
        });
      })
      .addCase(updateAdminAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(getRecuitmentAction.pending, (state) => {})
      .addCase(getRecuitmentAction.fulfilled, (state, action) => {
        state.recruitment = action.payload.result;
      })
      .addCase(getRecuitmentAction.rejected, (state, action) => {
        state.message = action.payload as string;
      });
    builder
      .addCase(deleteRecuitmentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRecuitmentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.recruitment = action.payload.result;
        if (action.payload.status === 200) {
          state.recruitments = state.recruitments!.filter(
            (recruitment) => recruitment._id !== action.payload.result._id
          );
        }
      })
      .addCase(deleteRecuitmentAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
  },
});

export const {
  setMessageRecruitment,
  setStatusRecruitment,
  setCruitment,
  setTotalRecruitment,
  setCruitments,
} = recruitmentSlice.actions;

const selectSelf = (state: RootState) => state.recruitment;

const isStatusSelector = createSelector(selectSelf, (state) => state.status);
const isLoadingSelector = createSelector(selectSelf, (state) => state.loading);

const isMessageSelector = createSelector(selectSelf, (state) => state.message);

const isTotalSelector = createSelector(selectSelf, (state) => state.total);

const getRecruitmentSelector = createSelector(
  selectSelf,
  (state) => state.recruitment
);
const getRecruitmentsSelector = createSelector(
  selectSelf,
  (state) => state.recruitments
);

const getFilterDatasSelector = createSelector(
  selectSelf,
  (state) => state.filterdata
);

export const recruitmentSelectors = {
  isMessageSelector,
  getRecruitmentSelector,
  isStatusSelector,
  getRecruitmentsSelector,
  isTotalSelector,
  getFilterDatasSelector,
  isLoadingSelector,
};

export default recruitmentSlice.reducer;
