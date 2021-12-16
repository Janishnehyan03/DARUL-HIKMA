import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuth: false,
  error: "",
  token: null,
  time: null,
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
      state.token = payload.token;
      state.time = payload.expireTime;
    },
    loginFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});
const { reducer, actions } = loginSlice;
export default reducer;
export const { loginSuccess, loginPending, loginFailed } = actions;
