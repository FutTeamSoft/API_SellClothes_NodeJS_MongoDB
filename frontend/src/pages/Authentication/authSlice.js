import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    login: {
      isFetching: false,
      error: false,
      message: null,
    },
    register: {
      isFetching: false,
      error: false,
      message: null,
    },
    update: {
      isFetching: false,
      error: false,
      message: null,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.currentUser = action.payload.account;
      state.login.message = action.payload.message;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.register.isFetching = false;
      state.register.message = action.payload.message;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
    },
    updateStart: (state) => {
      state.update.isFetching = true;
    },
    updateSuccess: (state, action) => {
      state.update.isFetching = false;
      state.update.message = action.payload.message;
    },
    updateFailed: (state) => {
      state.update.isFetching = false;
      state.update.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});
