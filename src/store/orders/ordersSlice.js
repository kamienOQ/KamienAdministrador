import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    cleanOrders: ( state ) => {
      state.orders = [];
    },
  },
});

export const { setOrders, cleanOrders } = ordersSlice.actions;
