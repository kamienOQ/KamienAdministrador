import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  sortNamesAscending,
  sortNamesDescending,
  sortWayToPayAscending,
  sortWayToPayDescending,
} from "../store/orders";

export const useFilters = () => {
  const dispatch = useDispatch();

  const [isUpNameActive, setIsUpNameActive] = useState(false);
  const [isDownNameActive, setIsDownNameActive] = useState(false);
  const [isUpPayActive, setIsUpPayActive] = useState(false);
  const [isDownPayActive, setIsDownPayActive] = useState(false);

  const onUpNameClick = () => {
    setIsUpNameActive(true);
    setIsDownNameActive(false);
    setIsUpPayActive(false);
    setIsDownPayActive(false);
    dispatch(sortNamesAscending());
  };

  const onDownNameClick = () => {
    setIsUpNameActive(false);
    setIsDownNameActive(true);
    setIsUpPayActive(false);
    setIsDownPayActive(false);
    dispatch(sortNamesDescending());
  };

  const onUpPayClick = () => {
    setIsUpNameActive(false);
    setIsDownNameActive(false);
    setIsUpPayActive(true);
    setIsDownPayActive(false);
    dispatch(sortWayToPayAscending());
  };

  const onDownPayClick = () => {
    setIsUpNameActive(false);
    setIsDownNameActive(false);
    setIsUpPayActive(false);
    setIsDownPayActive(true);
    dispatch(sortWayToPayDescending());
  };

  return {
    isUpNameActive,
    isDownNameActive,
    isUpPayActive,
    isDownPayActive,
    onUpNameClick,
    onDownNameClick,
    onUpPayClick,
    onDownPayClick,
  };
};
