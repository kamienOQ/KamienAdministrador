import { useDispatch, useSelector } from "react-redux";
import {
  onAddErrorMessage,
  onCloseEditModal,
  onCloseViewModal,
  onOpenEditModal,
  onOpenViewModal,
  onSetActiveOrder,
} from "../store/orders";

export const useOrdersUi = () => {
  const dispatch = useDispatch();
  const { openViewModal, openEditModal, activeOrder, isSaving, errorMessage } = useSelector(
    (state) => state.orders
  );

  const onViewOrder = (row) => {
    const newDate = new Date(row.date);
    const stringDate = `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
    dispatch(onSetActiveOrder({ ...row, stringDate }));
    dispatch(onOpenViewModal());
  };

  const closeViewModal = () => {
    dispatch(onCloseViewModal());
  };

  const onEditOrder = (row) => {
    const newDate = new Date(row.date);
    const stringDate = `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
    dispatch(onSetActiveOrder({ ...row, stringDate }));
    dispatch(onOpenEditModal());
  };

  const closeEditModal = () => {
    dispatch(onCloseEditModal());
  };

  const addErrorMessage = (message) => {
    dispatch(onAddErrorMessage(message));
  };

  return {
    openViewModal,
    openEditModal,
    activeOrder,
    isSaving,
    errorMessage,
    onViewOrder,
    closeViewModal,
    onEditOrder,
    closeEditModal,
    addErrorMessage,
  };
};
