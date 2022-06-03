import { createSelector, createSlice } from "@reduxjs/toolkit";
import { setAccessToken } from "../../untils/localStorageService";
import {
  deleteAccountAction,
  getAccountAction,
  getAccountByAdminAction,
  getAllAccountAction,
  loginAction,
  registerAction,
  updateAccountAction,
  updatePassAction,
  updateStatusAction,
} from "../action/auth";
import { IAuthState } from "../interface/auth";
import { RootState } from "../store";

const initialState: IAuthState = {
  isAuthorized: false,
  loading: false,
  token: null,
  account: null,
  updateAccount: null,
  accounts: null,
  status: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthorized: (state) => {
      state.isAuthorized = false;
    },
    setToken: (state) => {
      state.token = null;
    },

    setStatusAuth: (state) => {
      state.status = null;
    },
    setMessageAuth: (state) => {
      state.message = null;
    },
    setAccountAuth: (state) => {
      state.account = null;
    },
    setUpdateAccountAuth: (state) => {
      state.updateAccount = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthorized = true;
        state.token = action.payload.result;
        state.status = action.payload.status;
        state.message = action.payload.message;
        setAccessToken(action.payload.result);
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(updatePassAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassAction.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload.result;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(updatePassAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload.result;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(getAccountAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccountAction.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload.result;
      })
      .addCase(getAccountAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(getAllAccountAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAccountAction.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload.result;
      })
      .addCase(getAllAccountAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(updateStatusAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatusAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.account = action.payload.result;
        if (action.payload.status === 200) {
          state.accounts = state.accounts!.map((account) => {
            if (account._id === action.payload.result._id) {
              account.status = action.payload.result.status;
            }
            return account;
          });
        }
      })
      .addCase(updateStatusAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(deleteAccountAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAccountAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.account = action.payload.result;
        if (action.payload.status === 200) {
          state.accounts = state.accounts!.filter(
            (account) => account._id !== action.payload.result._id
          );
        }
      })
      .addCase(deleteAccountAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(getAccountByAdminAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccountByAdminAction.fulfilled, (state, action) => {
        state.loading = false;
        state.updateAccount = action.payload.result;
      })
      .addCase(getAccountByAdminAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
    builder
      .addCase(updateAccountAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAccountAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.updateAccount = action.payload.result;
      })
      .addCase(updateAccountAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
  },
});

export const {
  setAuthorized,
  setMessageAuth,
  setToken,
  setStatusAuth,
  setUpdateAccountAuth,
  setAccountAuth,
} = authSlice.actions;

const selectSelf = (state: RootState) => state.auth;

const isAuthorizedSelector = createSelector(
  selectSelf,
  (state) => state.isAuthorized
);

const isStatusSelector = createSelector(selectSelf, (state) => state.status);

const isMessageSelector = createSelector(selectSelf, (state) => state.message);

const getTokenSelector = createSelector(selectSelf, (state) => state.token);

const getAccountSelector = createSelector(selectSelf, (state) => state.account);
const getUpdateAccountSelector = createSelector(
  selectSelf,
  (state) => state.updateAccount
);
const getAccountsSelector = createSelector(
  selectSelf,
  (state) => state.accounts
);

export const authSelectors = {
  isAuthorizedSelector,
  getTokenSelector,
  isMessageSelector,
  getAccountSelector,
  getAccountsSelector,
  getUpdateAccountSelector,
  isStatusSelector,
};

export default authSlice.reducer;
