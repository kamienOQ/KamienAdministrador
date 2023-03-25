import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    numberOrders: undefined,
    orders: [],
    isLoading: false
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
    setNumberOrders: ( state, action ) => {
      state.numberOrders = action.payload;
    },
    cleanOrders: ( state ) => {
      state.orders = [];
      state.isLoading = true;
    },
  },
});

export const { setOrders, setNumberOrders, cleanOrders } = ordersSlice.actions;
