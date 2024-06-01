import { useDispatch, useSelector } from "react-redux";
import {
  onAddErrorMessage,
  onAddIconProduct,
  onAddPhotoProduct,
  onAddImageProduct,
  onAddNewProduct,
  onAddProducts,
  onAddSuccessMessage,
  onChangeAscending,
  onCleanProducts,
  onSetActiveProduct,
  onChangeEditing,
  onSetNumberProducts,
  onChangePreProductName,
  onChangePreProductUpdated,
  onChangeActive,
  onChangePageAndSize,
  onChangeFilterings,
  onChangeFilters,
  onChangeEditSuccess,
  onChangeCreateSuccess,
} from "../store/products/productsSlice";

import {
  onStartGetCategoriesForm,
  onStartGetAttributesForm,
  onStartGetListAttributesForm,
  onStartUpdateProduct,
  onStartChangeActiveProduct,
  onStartFilterProducts,
  onStartGetProducts,
  onStartUploadFile,
  onStartUploadNewProduct,
  onStartNumberProducts,
  onStartDeleteProduct
} from "../store/products/thunks";

export const useProductsStore = () => {
  const dispatch = useDispatch();

  const {
    activeProduct,
    products,
    categories,
    attributes,
    listAttributes,
    editing,
    filter,
    filtering,
    isSaving,
    isLoading,
    message,
    numberProducts,
    createSuccess,
    editSuccess,
  } = useSelector((state) => state.products);

  //*Slice
  const addNewProduct = () => {
    dispatch(onAddNewProduct());
  };

  const setActiveProduct = (product) => {
    dispatch(onSetActiveProduct(product));
  };

  const addImageProduct = (images) => {
    dispatch(onAddImageProduct(images));
  };

  const addIconProduct = (images) => {
    dispatch(onAddIconProduct(images));
  };

  const addPhotoProduct = (images) => {
    dispatch(onAddPhotoProduct(images));
  };

  const addProducts = (products) => {
    dispatch(onAddProducts(products));
  };

  const addErrorMessage = (message) => {
    dispatch(onAddErrorMessage(message));
  };

  const addSuccessMessage = (message) => {
    dispatch(onAddSuccessMessage(message));
  };

  const setNumberProducts = (number) => {
    dispatch(onSetNumberProducts(number));
  };

  const changeEditing = (value) => {
    dispatch(onChangeEditing(value));
  };

  const changePreProductName = (value) => {
    dispatch(onChangePreProductName(value));
  };

  const changePreProductUpdated = (value) => {
    dispatch(onChangePreProductUpdated(value));
  };

  const changeFiltering = (value) => {
    dispatch(onChangeFilterings(value));
  };

  const changeFilter = (value) => {
    dispatch(onChangeFilters(value));
  };

  const changeActive = () => {
    dispatch(onChangeActive());
  };

  const changePageAndSize = (value) => {
    dispatch(onChangePageAndSize(value));
  };

  const cleanProducts = () => {
    dispatch(onCleanProducts());
  };

  const changeCreateSuccess = (value) => {
    dispatch(onChangeCreateSuccess(value));
  };

  const changeEditSuccess = (value) => {
    dispatch(onChangeEditSuccess(value));
  };

  //*Thunks

  const startUploadFile = (file, type, collectionName) => {
    dispatch(onStartUploadFile(file, type, collectionName));
  };

  const startUploadNewProduct = () => {
    dispatch(onStartUploadNewProduct());
  };

  const starGetProductsUploaded = () => {
    dispatch(onStarGetProductsUploaded());
  };

  const startGetProducts = (page, size) => {
    dispatch(onStartGetProducts(page, size));
  };

  const startNumberProducts = () => {
    dispatch(onStartNumberProducts());
  };

  const startFilterProducts = (page, size, preValue) => {
    dispatch(onStartFilterProducts(page, size, preValue));
  };

  const startUpdateProduct = () => {
    dispatch(onStartUpdateProduct());
  };

  const startChangeActiveProduct = () => {
    dispatch(onStartChangeActiveProduct());
  };

  const starGetCategoriesForm = () => {
    dispatch(onStartGetCategoriesForm());
  };

  const startGetAttributesForm = () => {
    dispatch(onStartGetAttributesForm());
  };

  const startGetListAttributesForm = () => {
    dispatch(onStartGetListAttributesForm());
  };

  const startDeleteProduct = (product) => {
    dispatch(onStartDeleteProduct(product));
  };

  return {
    //*Propiedades
    activeProduct,
    products,
    categories,
    attributes,
    listAttributes,
    editing,
    filter,
    isLoading,
    filtering,
    isSaving,
    message,
    numberProducts,
    createSuccess,
    editSuccess,

    //*Métodos
    addErrorMessage,
    addIconProduct,
    addPhotoProduct,
    addImageProduct,
    addNewProduct,
    addProducts,
    addSuccessMessage,
    changeActive,
    changeEditing,
    changeFilter,
    changeFiltering,
    changePageAndSize,
    changePreProductName,
    changePreProductUpdated,
    cleanProducts,
    setActiveProduct,
    setNumberProducts,
    startChangeActiveProduct,
    startFilterProducts,
    startGetProducts,
    starGetCategoriesForm,
    startGetAttributesForm,
    startGetListAttributesForm,
    startNumberProducts,
    startUpdateProduct,
    startUploadFile,
    startUploadNewProduct,
    changeCreateSuccess,
    changeEditSuccess,
    startDeleteProduct,
  };
};

