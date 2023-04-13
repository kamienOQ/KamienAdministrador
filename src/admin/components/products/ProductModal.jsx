import { useEffect, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent, Avatar, Typography, Alert, Grid } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { useCategoriesStore, useProductsForm, useProductsState, useProductsStore, useUiStore } from "../../../hooks/index";
import { deleteFileUpload } from "../../../helpers/deleteFileUpload";

export const ProductModal = () => { 

  const { closeProductModal, isProductModalOpen, productsSelected  } = useUiStore();
  
  const { products, activeProduct, editing, selected, onSelectProduct, message, setActiveProduct, addErrorMessage, addSuccessMessage, 
      startUploadNewProduct, startNumberProducts, changeEditing, changePreProductUpdated, startUpdateProduct } = useProductsStore();
  const { imageLoad, setImageLoad, iconLoad, setIconLoad, onUploadImage, onUploadIcon } = useProductsState();

  const { productName, price, atributes, onInputChange, formState } = useProductsForm(activeProduct);
  const [ emptyName, setEmptyName ] = useState(false);

  const { setNumberCategories } = useCategoriesStore();

  useEffect(() => {
    if(editing){
      if(activeProduct.image.url){
        setImageLoad(true);
      }
      if(activeProduct.icon.url){
        setIconLoad(true);
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
  }, [formState, productsSelected, imageLoad, iconLoad ]);
  
  
  const onCloseModa = () => {
    if (imageLoad) {
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
    if (iconLoad) {
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
      }if(editing){
        startUpdateProduct();
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
            sx={{ p: 1 }}
            InputLabelProps={{
              style: { color: '#000000' },
            }}
            type="text"
            fullWidth
            label="Nombre del Producto" variant="filled" focused 
            name="productName"
            value={productName || ''}
            onChange={onInputChange}
            error={emptyName}
            helperText={emptyName ? 'Campo vacío' : ''} 
          />
          <TextField
            sx={{ p: 1 }}
            InputLabelProps={{
              style: { color: '#000000' },
            }}
            type="number"
            fullWidth
            label="Precio del Producto" variant="filled" focused
            name="price"
            value={price || ''}
            onChange={onInputChange}
            error={emptyName}
            helperText={emptyName ? 'Campo vacío' : ''}
          />
          <TextField
            sx={{ p: 1 }}
            InputLabelProps={{
              style: { color: '#000000' },
            }}
            type="text"
            fullWidth
            label="Atributos del Producto" variant="filled" focused
            name="atributes"
            value={atributes || ''}
            onChange={onInputChange}
            error={emptyName}
            helperText={emptyName ? 'Campo vacío' : ''}
          />
          <TextField
            sx={{ p: 1 }}
            InputLabelProps={{
              style: { color: '#000000' },
            }}
            fullWidth
            id="outlined-select-currency"
            select
            label="Categoría del producto" variant="filled" focused
            defaultValue=""
            //onChange={startGetCategories()}
            onChange={setNumberCategories}
            helperText="Por favor seleccione la categoría del producto"
          >
            {/* importar y recorrer productsUploaded opteniendo el nombre */}
            {/*productsCategoriesPrueba.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))*/}
          </TextField>
          {selected && <FloatingTags />}
          <div className="products-modal-buttons">
            <div className="upload-files-container">
              <div className="files-name-container">
                <Typography sx={ { color: "quaternary.main", fontWeight: 'bold' }}>
                  Imagen
                </Typography>
                <Typography sx={ { color: "quaternary.main", fontWeight: 'bold' }}>
                  Icono
                </Typography>
              </div>
              <div className="iconImage-buttons">
                <IconButton
                  className="addIcon-button"
                  color="primary"
                  aria-label="cargar imagen"
                  component="label"
                  onChange={onUploadImage}
                  sx={{ color: "secondary.main", padding: imageLoad ? '3px' : '12px' }}
                >
                  <input hidden accept="image/*" type="file" />
                  <AddPhotoAlternateIcon style={{ display: imageLoad ? 'none' : '' }} />
                  {imageLoad &&
                    <Avatar
                      alt="Imagen"
                      src={activeProduct?.image.url}
                    />
                  }
                </IconButton>
                <IconButton
                  className="addIcon-button"
                  color="primary"
                  aria-label="cargar icono"
                  component="label"
                  onChange={onUploadIcon}
                  sx={{ color: "secondary.main", padding: iconLoad ? '3px' : '12px' }}
                >
                  <input hidden accept=".png" type="file" />
                  <AddReactionIcon style={{ display: iconLoad ? 'none' : '' }} />
                  {iconLoad &&
                    <Avatar
                      alt="Icono"
                      src={activeProduct?.icon.url}
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
                sx={{ backgroundColor: "error.main", borderRadius: 20 }}
              >
                <CloseIcon />
              </Button>

              <Button
                className="addProduct-modal-button"
                onClick={onSave}
                variant="contained"
                sx={{ backgroundColor: "success.main", color: "tertiary.main", borderRadius: 20 }}
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
