import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  createCvAction,
  deleteCvAction,
  getStatusFalseCvAction,
  getStatusTrueCvAction,
  updateStatusCvAction,
} from "../action/cv";
import { ICvtState } from "../interface/cv";
import { RootState } from "../store";

const initialState: ICvtState = {
  loading: false,
  cv: null,
  cvs: null,
  status: null,
  message: null,
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    setStatusCv: (state) => {
      state.status = null;
    },
    setMessageCv: (state) => {
      state.message = null;
    },
    setCv: (state) => {
      state.cv = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCvAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCvAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.cv = action.payload.result;
      })
      .addCase(createCvAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(getStatusTrueCvAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatusTrueCvAction.fulfilled, (state, action) => {
        state.loading = false;
        state.cvs = action.payload.result;
      })
      .addCase(getStatusTrueCvAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(getStatusFalseCvAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatusFalseCvAction.fulfilled, (state, action) => {
        state.loading = false;
        state.cvs = action.payload.result;
      })
      .addCase(getStatusFalseCvAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(updateStatusCvAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatusCvAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.cv = action.payload.result;
        if (action.payload.status === 200) {
          state.cvs = state.cvs!.filter(
            (cv) => cv._id !== action.payload.result._id
          );
        }
      })
      .addCase(updateStatusCvAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });

    builder
      .addCase(deleteCvAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCvAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.cv = action.payload.result;
        if (action.payload.status === 200) {
          state.cvs = state.cvs!.filter(
            (cv) => cv._id !== action.payload.result._id
          );
        }
      })
      .addCase(deleteCvAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
  },
});

export const { setCv, setMessageCv, setStatusCv } = cvSlice.actions;

const selectSelf = (state: RootState) => state.cv;

const isStatusSelector = createSelector(selectSelf, (state) => state.status);

const isMessageSelector = createSelector(selectSelf, (state) => state.message);

const getCvSelector = createSelector(selectSelf, (state) => state.cv);
const getCvsSelector = createSelector(selectSelf, (state) => state.cvs);

export const cvSelectors = {
  isMessageSelector,
  isStatusSelector,
  getCvSelector,
  getCvsSelector,
};

export default cvSlice.reducer;
