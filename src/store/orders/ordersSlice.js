import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    numberOrders: 0,
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
