import { useEffect, useState } from "react";
import { TextField, Dialog, DialogTitle, Table, TableHead, Button, MenuItem, IconButton, DialogContent, Avatar, Typography, Alert, Grid } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { useProductsForm, useProductsState, useProductsStore, useUiStore } from "../../hooks";
import { deleteFileUpload } from "../../helpers";
import { FloatingTags } from "./FloatingTags";

const products = [
  {
    label: 'Reloj'
  },
  {
    label: 'Camisa'
  },
  {
    label: 'Pantalón'
  },
  {
    label: 'Anteojos'
  },
  {
    label: 'Perfumes'
  },
  {
    label: 'Zapatos'
  },
  {
    label: 'Bolsos'
  },
];

export const ProductModal = () => { 

  const { closeProductModal, isProductModalOpen, productsSelected  } = useUiStore();
  
  const { activeProduct, message, setActiveProduct, addErrorMessage, addSuccessMessage, 
    startUploadNewProduct, addProducts } = useProductsStore();
  const { imageLoad, iconLoad, selected, onSelectProduct, onUploadImage, onUploadIcon } = useProductsState();

  const { productName, price, atributes, onInputChange, formState } = useProductsForm(activeProduct);
  const [ emptyName, setEmptyName ] = useState(false);


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
      deleteFileUpload(activeProduct.image.name);
    }
    if (iconLoad) {
      deleteFileUpload(activeProduct.icon.name);
    }

    closeProductModal();
  }

  const onSave = () => {
    if (activeProduct.productName === '') {
      setEmptyName(true);
    } else {
      addProducts(productsSelected);
      startUploadNewProduct();
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
          color= "#ffffff"
          sx={ { borderRadius: '16px', backgroundColor:"#000000" } }
        >
          Agregar un nuevo Producto
        </DialogTitle >
        <form className="product-form">
          <TextField
            sx={{ p: 1, color: "#000000" }}
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
            sx={{ p: 1, color: "#000000" }}
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
            sx={{ p: 1, color: "#000000" }}
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
            sx={{ p: 1, color: "#000000" }}
            fullWidth
            id="outlined-select-currency"
            select
            label="Categoría del producto" variant="filled" focused
            defaultValue=""
            onChange={onSelectProduct}
            helperText="Por favor seleccione la categoría del producto"
          >
            {/* importar y recorrer productsUploaded opteniendo el nombre */}
            {products.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {selected && <FloatingTags />}
          <div className="products-modal-buttons">
            <div className="upload-files-container">
              <div className="files-name-container">
                <Typography sx={ { color: "#000000" }}>
                  Imagen
                </Typography>
                <Typography sx={ { color: "#000000" }}>
                  Icono
                </Typography>
              </div>
              <div className="iconImage-buttons">
                <IconButton
                  className="addProduct-button"
                  color="primary"
                  aria-label="cargar imagen"
                  component="label"
                  onChange={onUploadImage}
                  sx={{ backgroundColor: "golden.main", color: "secondary.main", padding: imageLoad ? '3px' : '12px' }}
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
                  className="addProduct-button"
                  color="primary"
                  aria-label="cargar icono"
                  component="label"
                  onChange={onUploadIcon}
                  sx={{ backgroundColor: "golden.main", color: "secondary.main", padding: iconLoad ? '3px' : '12px' }}
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
                sx={{ borderRadius: '16px', m: 0.1 }}
                color="error"
              >
                <CloseIcon />
              </Button>
              <Button
                className="addProduct-button"
                onClick={onSave}
                variant="contained"
                sx={{ borderRadius: '16px', m: 0.1 }}
                color="success"
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
