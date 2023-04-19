import { useDispatch, useSelector } from "react-redux";
import { onCloseViewModal, onOpenViewModal, onSetActiveOrder } from "../store/orders";

export const useOrdersUi = () => {
  const dispatch = useDispatch();
  const { openViewModal, activeOrder } = useSelector((state) => state.orders);

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

  return {
    openViewModal,
    activeOrder,
    onViewOrder,
    closeViewModal,
  };
};
