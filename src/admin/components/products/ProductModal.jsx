import React, { useEffect, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent, Avatar, Typography, Alert, Grid } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { useProductsForm, useProductsState, useProductsStore, useUiStore } from "../../../hooks/index";
import { deleteFileUpload } from "../../../helpers/deleteFileUpload";
import { FloatingTags } from "./FloatingTags";
import { FloatingTagsAttributes } from './FloatingTagsAttributes'
import { FloatingTagsListAttributes } from "./FloatingTagsListAttributes";

export const ProductModal = () => { 

  const { closeProductModal, isProductModalOpen, categoriesSelected, attributesSelected, 
    listAttributesSelected  } = useUiStore();
  
  const { products, categories, attributes, listAttributes, activeProduct, editing, message, setActiveProduct, 
    addErrorMessage, addSuccessMessage, startUploadNewProduct, startNumberProducts, changeEditing, 
    changePreProductUpdated, startUpdateProduct, isSaving, changeCreateSuccess, changeEditSuccess } = useProductsStore();
  const { imageLoad, setImageLoad, iconLoad, setIconLoad, photoLoad, setPhotoLoad, onUploadImage, onUploadIcon, onUploadPhoto,
    onSelectCategory, onSelectAttribute, onSelectListAttribute, selected } = useProductsState();

  const { productName, price, atributes, onInputChange, formState } = useProductsForm(activeProduct);
  const [ emptyName, setEmptyName ] = useState(false);
  
  useEffect(() => {
    if(editing){
      if(activeProduct && activeProduct.image.url){
        setImageLoad(true);
      }
      if(activeProduct.icon && activeProduct.icon.url){
        setIconLoad(true);
      }
      if(activeProduct.photo && activeProduct.photo.url){
        setPhotoLoad(true);
      }
    }
  }, []);

  useEffect(() => {
    setActiveProduct(formState);
    setEmptyName(false);
  }, [formState]);

  useEffect(() => {
    addErrorMessage('');
    addSuccessMessage('');
  }, [formState, categoriesSelected, attributesSelected, listAttributesSelected, imageLoad, iconLoad, photoLoad]);
  
  
  const onCloseModa = () => {
    if (imageLoad && activeProduct.image && activeProduct.image.name) {
      let usingImage = false;
      products.forEach(object => {
        if (object.image.name === activeProduct.image.name) {
          usingImage = true;
          return;
        }
      });
      if (!usingImage) {
        deleteFileUpload(activeProduct.image.name);
      }
    }

    if (iconLoad && activeProduct.icon && activeProduct.icon.name) {
      let usingIcon = false;
      products.forEach(object => {
        if (object.icon.name === activeProduct.icon.name) {
          usingIcon = true;
          return;
        }
      });
      if (!usingIcon) {
        deleteFileUpload(activeProduct.icon.name);
      }
    }

    if (photoLoad && activeProduct.photo && activeProduct.photo.name) {
      let usingPhoto = false;
      products.forEach(object => {
        if (object.photo.name === activeProduct.photo.name) {
          usingPhoto = true;
          return;
        }
      });
      if (!usingPhoto) {
        deleteFileUpload(activeProduct.photo.name);
      }
    }

    closeProductModal();
    changeEditing(false);
    changePreProductUpdated(false);
  }

  const onSave = () => {
    if (activeProduct.productName === '') {
      setEmptyName(true);
    } else {
      if(!editing){
        startUploadNewProduct();
        startNumberProducts();
        changePreProductUpdated(false);
        changeCreateSuccess(true);
      }if(editing){
        startUpdateProduct();
        changeEditSuccess(true);
      }
    }
  }

  return (
    <Dialog
      className="modal-container-products"
      open={isProductModalOpen} 
      align="center"
    >
      <DialogContent>
        <DialogTitle 
          variant="h7"  
          sx={ { borderRadius: '16px', backgroundColor: "dark.main", color: "tertiary.main" } }
        >
          {editing ? 'Editar un Producto' : 'Agregar un nuevo Producto'}
        </DialogTitle >
        <form className="product-form">
          <TextField
            type="text"
            fullWidth
            label="Nombre del Producto" variant="filled" focused 
            name="productName"
            value={productName || ''}
            onChange={onInputChange}
            error={emptyName}
            helperText={emptyName ? 'Campo vacío' : ''} 
            sx={{ color: 'quaternary.main', '& label.Mui-focused': {color: 'quaternary.main'}, 
            '& .MuiFilledInput-underline:after': {borderBottomColor: 'quaternary.main'} }}
          />
          <TextField
            type="number"
            fullWidth
            label="Precio del Producto" variant="filled" focused
            name="price"
            value={price || ''}
            onChange={onInputChange}
            error={emptyName}
            helperText={emptyName ? 'Campo vacío' : ''}
             sx={{ color: 'quaternary.main', '& label.Mui-focused': {color: 'quaternary.main'}, 
            '& .MuiFilledInput-underline:after': {borderBottomColor: 'quaternary.main'} }}
          />
          <div className="floatingTags-container">
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Atributos del Producto" variant="filled" focused
              defaultValue=""
              onChange={onSelectAttribute}
              helperText={emptyName ? 'Campo vacío' : ''}
              sx={{ color: 'quaternary.main', '& label.Mui-focused': {color: 'quaternary.main'}, 
              '& .MuiFilledInput-underline:after': {borderBottomColor: 'quaternary.main'} }}
            >
              {/* importar y recorrer attributesUploaded obteniendo el nombre */}
              {attributes.map((option) => (
                option.map((option1) => (
                  <MenuItem key={option1} value={option1}>
                    {option1}
                  </MenuItem>
                ))
              ))}
            </TextField>
            <FloatingTagsAttributes />
          </div>
          <div className="floatingTags-container">
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Características de los atributos del Producto" variant="filled" focused
              defaultValue=""
              onChange={onSelectListAttribute}
              helperText={emptyName ? 'Campo vacío' : ''}
              sx={{ color: 'quaternary.main', '& label.Mui-focused': {color: 'quaternary.main'}, 
              '& .MuiFilledInput-underline:after': {borderBottomColor: 'quaternary.main'} }}
            >
              {/* importar y recorrer attributesUploaded obteniendo el nombre */}
              {listAttributes.map((option) => (
                option.feature.map((option1) => (
                  (option1 !== null) && (
                    <MenuItem key={option1} value={option1}>
                      {option1}
                    </MenuItem>
                  )))
                ))}
            </TextField>
            <FloatingTagsListAttributes />
          </div>
          <div className="floatingTags-container">
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Categoría del producto" variant="filled" focused
              defaultValue=""
              onChange={onSelectCategory}
              helperText="Por favor seleccione la categoría del producto"
              sx={{ color: 'quaternary.main', '& label.Mui-focused': {color: 'quaternary.main'}, 
              '& .MuiFilledInput-underline:after': {borderBottomColor: 'quaternary.main'} }}
            >
              {/* importar y recorrer categoriesUploaded obteniendo el nombre */}
              {categories.map((option) => (
                option.map((option1) => (
                  <MenuItem key={option1} value={option1}>
                    {option1}
                  </MenuItem>
                ))
              ))}
            </TextField>
            <FloatingTags />
          </div>
          
          <div className="products-modal-buttons">
            <div className="upload-files-container">
              <div className="files-name-container">
                <Typography sx={ { color: "quaternary.main", fontWeight: 'bold' }}>
                  Imagen
                </Typography>
                <Typography sx={ { color: "quaternary.main", fontWeight: 'bold' }}>
                  Imagen 2
                </Typography>
                <Typography sx={ { color: "quaternary.main", fontWeight: 'bold' }}>
                  Imagen 3
                </Typography>
              </div>
              <div className="iconImage-buttons">
                <IconButton
                  className="addIcon-button addCategory-button"
                  color="primary"
                  aria-label="cargar imagen"
                  component="label"
                  onChange={onUploadImage}
                  sx={{ color: "secondary.main", padding: imageLoad ? '3px' : '12px' }}
                  disabled={isSaving}
                >
                  <input hidden accept=".png, .webp" type="file" />
                  <AddPhotoAlternateIcon style={{ display: imageLoad ? 'none' : '' }} />
                  {imageLoad &&
                    <Avatar
                      alt="Imagen"
                      src={activeProduct?.image.url}
                    />
                  }
                </IconButton>


                <IconButton
                  className="addIcon-button addCategory-button"
                  color="primary"
                  aria-label="cargar icono"
                  component="label"
                  onChange={onUploadIcon}
                  sx={{ color: "secondary.main", padding: iconLoad ? '3px' : '12px' }}
                  disabled={isSaving}
                >
                  <input hidden accept=".png, .webp" type="file" />
                  <AddPhotoAlternateIcon style={{ display: iconLoad ? 'none' : '' }} />
                  {iconLoad &&
                    <Avatar
                      alt="Icono"
                      src={activeProduct?.icon.url}
                    />
                  }
                </IconButton>


                <IconButton
                  className="addIcon-button addCategory-button"
                  color="primary"
                  aria-label="cargar imagen"
                  component="label"
                  onChange={onUploadPhoto}
                  sx={{ color: "secondary.main", padding: photoLoad ? '3px' : '12px' }}
                  disabled={isSaving}
                >
                  <input hidden accept=".png, .webp" type="file" />
                  <AddPhotoAlternateIcon style={{ display: photoLoad ? 'none' : '' }} />
                  {photoLoad &&
                    <Avatar
                      alt="Imagen 2"
                      src={activeProduct?.photo.url}
                    />
                  }
                </IconButton>
              </div>
            </div>
            <Grid
              item
              xs={12}
              display={!!message.error ? '' : 'none'}
            >
              <Alert severity='error'>{ message.error }</Alert>
            </Grid>
            <div className="action-buttons" sx={ { borderRadius: '50%' } }>
              <Button
                className="cancelProduct-button"
                onClick={onCloseModa}
                variant="contained"
                sx={{ backgroundColor: "error.main", borderRadius: 20, mt: 5 }}
                disabled={isSaving}
              >
                <CloseIcon />
              </Button>

              <Button
                className="addProduct-modal-button"
                onClick={onSave}
                variant="contained"
                sx={{ backgroundColor: "success.main", color: "tertiary.main", borderRadius: 20, mt: 5 }}
                disabled={isSaving}
              >
                <CheckIcon />
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
