import { useEffect, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent, Avatar, Typography, Alert, Grid } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddReactionIcon from '@mui/icons-material/AddReaction';

import { useProductsForm, useProductsState, useProductsStore, useUiStore } from "../../hooks"
import { FloatingTags } from ".";
import { deleteFileUpload } from "../../helpers/deleteFileUpload";

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

  const { closeProductModal, isProductModalOpen, productsSelected } = useUiStore();
  const { activeProduct, message, addProducts, setActiveProduct, 
          addErrorMessage, addSuccessMessage, startUploadNewProduct 
        } = useProductsStore();
  const { imageLoad, iconLoad, selected, onUploadImage, onUploadIcon, onSelectCategory } = useProductsState();

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
      className="modal-container-categories"
      open={isProductModalOpen}
    >
      <DialogContent sx={{ maxHeight: 600, pl: .1, pr: .1 }}>
        <DialogTitle >Agregar Producto</DialogTitle>
        <form className="product-form">
          <TextField
            type="text"
            fullWidth
            label="Nombre del Producto"
            variant="outlined"
            name="productName"
            value={productName || ''}
            onChange={onInputChange}
            error={emptyName}
            helperText={emptyName ? 'Campo vacío' : ''}
          />
          <TextField
            type="number"
            fullWidth
            label="Precio del Producto"
            variant="outlined"
            name="price"
            value={price || ''}
            onChange={onInputChange}
            error={emptyName}
            helperText={emptyName ? 'Campo vacío' : ''}
          />
          <TextField
            type="text"
            fullWidth
            label="Atributos del Producto"
            variant="outlined"
            name="atributes"
            value={atributes || ''}
            onChange={onInputChange}
            error={emptyName}
            helperText={emptyName ? 'Campo vacío' : ''}
          />
          <TextField
            fullWidth
            id="outlined-select-currency"
            select
            label="Categoría del producto"
            defaultValue=""
            onChange={onSelectCategory}
            helperText="Por favor seleccione los productos"
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
                <Typography>
                  Imagen
                </Typography>
                <Typography>
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
            <div className="action-buttons">
              <Button
                className="cancelProduct-button"
                onClick={onCloseModa}
                variant="contained"
                sx={{ backgroundColor: "error.main" }}
              >
                Cancelar
              </Button>
              <Button
                className="addProduct-button"
                onClick={onSave}
                variant="contained"
                sx={{ backgroundColor: "golden.main" }}
              >
                Agregar
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
