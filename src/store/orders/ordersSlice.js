import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    numberOrders: undefined,
    orders: [],
    isLoading: false,
    openViewModal: false,
    activeOrder: null,
    filtering: false,
    filter: {},
    pageSize: 5,
  },
  reducers: {
    onSetOrders: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
    onSetNumberOrders: (state, action) => {
      state.numberOrders = action.payload;
    },
    onCleanOrders: (state) => {
      state.orders = [];
      state.isLoading = true;
    },
    onOpenViewModal: (state) => {
      state.openViewModal = true;
    },
    onCloseViewModal: (state) => {
      state.openViewModal = false;
      state.activeOrder = null;
    },
    onSetActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },
    onChangeFiltering: (state, action) => {
      state.filtering = action.payload;
    },
    onChangeFilter: (state, action) => {
      state.filter = action.payload;
    },
    onChangePageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export const {
  onSetOrders,
  onSetNumberOrders,
  onCleanOrders,
  onOpenViewModal,
  onCloseViewModal,
  onSetActiveOrder,
  onChangeFiltering,
  onChangeFilter,
  onChangePageSize,
} = ordersSlice.actions;
