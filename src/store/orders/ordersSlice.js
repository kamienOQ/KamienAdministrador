import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    numberOrders: 0,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload.sort((a, b) => b.date - a.date);
    },
    sortNamesAscending: (state) => {
      state.orders = state.orders.sort((a, b) => a.name.localeCompare(b.name));
    },
    sortNamesDescending: (state) => {
      state.orders = state.orders.sort((a, b) => b.name.localeCompare(a.name));
    },
    sortWayToPayAscending: (state) => {
      state.orders = state.orders.sort((a, b) => a.wayToPay.localeCompare(b.wayToPay));
    },
    sortWayToPayDescending: (state) => {
      state.orders = state.orders.sort((a, b) => b.wayToPay.localeCompare(a.wayToPay));
    },
    cleanOrders: ( state ) => {
      state.orders = [];
    },
  },
});

export const { setOrders, sortNamesAscending, sortNamesDescending, sortWayToPayAscending, sortWayToPayDescending, cleanOrders } = ordersSlice.actions;
