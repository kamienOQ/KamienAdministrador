import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload.sort((a, b) => b.date - a.date);
    },
    cleanOrders: ( state ) => {
      state.orders = [];
    },
  },
});

export const { setOrders, cleanOrders } = ordersSlice.actions;
