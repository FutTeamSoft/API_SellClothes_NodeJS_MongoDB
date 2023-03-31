import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "~/layouts/components/Header/headerSlice";
import authSlice from "~/pages/Authentication/authSlice";
import productsSlice from "~/pages/Products/productsSlice";

const store = configureStore({
  reducer: {
    header: headerSlice.reducer,
    auth: authSlice.reducer,
    products: productsSlice.reducer,
  },
});

export default store;
