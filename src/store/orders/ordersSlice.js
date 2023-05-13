import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    numberOrders: undefined,
    orders: [],
    isLoading: false,
    isSaving: false,
    errorMessage: "",
    openViewModal: false,
    openEditModal: false,
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
    onOpenEditModal: (state) => {
      state.openEditModal = true;
      state.errorMessage = "";
    },
    onCloseEditModal: (state) => {
      state.openEditModal = false;
      state.activeOrder = null;
    },
    onSetActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },
    onSavingOrder: (state) => {
      state.isSaving = true;
    },
    onAddErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
      state.isSaving = false;
    },
    onUpdateOrder: (state, { payload }) => {
      state.orders = state.orders.map((order) => {
        if (order.id === payload.id) {
          return payload;
        }

        return order;
      });
      state.isSaving = false;
      state.errorMessage = "";
      state.openEditModal = false;
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
  onOpenEditModal,
  onCloseEditModal,
  onSetActiveOrder,
  onSavingOrder,
  onAddErrorMessage,
  onUpdateOrder,
  onChangeFiltering,
  onChangeFilter,
  onChangePageSize,
} = ordersSlice.actions;
