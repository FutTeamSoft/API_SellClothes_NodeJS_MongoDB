import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "products",
  initialState: {
    category: {
      sex: null,
      type: null,
      selected: "",
    },
    filters: {
      currentPage: 1,
      productsPerPage: 12,
      search: "",
    },
    data: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category.sex = action.payload.sex;
      state.category.type = action.payload.type;
    },
    setSelected: (state, action) => {
      state.category.selected = action.payload;
    },
    setProducts: (state, action) => {
      state.data = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.filters.currentPage = action.payload;
    },
    setSearchText: (state, action) => {
      state.filters.search = action.payload;
    },
  },
});
