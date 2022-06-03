import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import cvReducer from "./reducers/cv.reducer";
import profileReducer from "./reducers/profile.reducer";
import recruitmentReducer from "./reducers/recruitment.reducer";

const reducer = {
  auth: authReducer,
  profile: profileReducer,
  recruitment: recruitmentReducer,
  cv: cvReducer,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
