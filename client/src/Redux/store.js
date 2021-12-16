import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Redux/slices/loginSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
  },
});
