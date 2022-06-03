import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  createProfileAction,
  getProfileAction,
  updateProfileAction,
} from "../action/profile";
import { IProfileState } from "../interface/profile";
import { RootState } from "../store";

const initialState: IProfileState = {
  loading: false,
  profile: null,
  status: null,
  message: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setStatusProfile: (state) => {
      state.status = null;
    },
    setMessageProfile: (state) => {
      state.message = null;
    },
    setProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfileAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.profile = action.payload.result;
      })
      .addCase(createProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(updateProfileAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.result;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(getProfileAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.result;
      })
      .addCase(getProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
  },
});

export const { setMessageProfile, setStatusProfile, setProfile } = profileSlice.actions;

const selectSelf = (state: RootState) => state.profile;

const isStatusSelector = createSelector(selectSelf, (state) => state.status);

const isMessageSelector = createSelector(selectSelf, (state) => state.message);

const getProfileSelector = createSelector(selectSelf, (state) => state.profile);

export const profileSelectors = {
  isMessageSelector,
  getProfileSelector,
  isStatusSelector,
};

export default profileSlice.reducer;
