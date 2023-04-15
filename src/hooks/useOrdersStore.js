import { useDispatch, useSelector } from "react-redux";
import {
  onChangeFilter,
  onChangeFiltering,
  onChangePageSize,
  onStartFilterOrders,
  onStartGetOrders,
  onStartNumberOrders,
} from "../store/orders";

export const useOrdersStore = () => {
  const dispatch = useDispatch();
  const { numberOrders, isLoading, orders, filter, filtering } = useSelector(
    (state) => state.orders
  );

  // filter, filtering, changeFilter, changeFiltering, startFilterAttributes, startGetAttributes, isLoading, numberCategories, changePageSize

  const changeFiltering = (value) => {
    dispatch(onChangeFiltering(value));
  };

  const changeFilter = (value) => {
    dispatch(onChangeFilter(value));
  };

  const changePageSize = (pageSize) => {
    dispatch(onChangePageSize(pageSize));
  };

  //*Thunks
  const startGetOrders = (page, size) => {
    dispatch(onStartGetOrders(page, size));
  };

  const startNumberOrders = () => {
    dispatch(onStartNumberOrders());
  };

  const startFilterOrders = (page, size, preValue) => {
    dispatch(onStartFilterOrders(page, size, preValue));
  };

  return {
    //*Propiedades
    numberOrders,
    isLoading,
    orders,
    filter,
    filtering,

    //*Métodos
    changeFilter,
    changeFiltering,
    changePageSize,
    startGetOrders,
    startNumberOrders,
    startFilterOrders,
  };
};
