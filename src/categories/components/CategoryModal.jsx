import { useEffect, useRef, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent, Avatar } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddReactionIcon from '@mui/icons-material/AddReaction';

import { useCategoriesForm, useCategoriesState, useCategoriesStore, useUiStore } from "../../hooks"
import { FloatingTags } from "./";

const products = [
  {
    label: 'Reloj Casio'
  },
  {
    label: 'Reloj Rolex'
  },
  {
    label: 'Reloj Omega'
  },
  {
    label: 'Reloj A'
  },
  {
    label: 'Reloj B'
  },
  {
    label: 'Reloj C'
  },
  {
    label: 'Reloj D'
  },
  {
    label: 'Reloj E'
  },
  {
    label: 'Reloj F'
  }
];

export const CategoryModal = () => {

  const { closeCategoryModal, isCategoryModalOpen, cleanProductsSelected, productsSelected } = useUiStore();
  const { activeCategory, addProducts, setActiveCategory } = useCategoriesStore();
  const { imageLoad, iconLoad, selected, onUploadImage, onUploadIcon, onSelectProduct } = useCategoriesState();

  const { categoryName, onInputChange, formState } = useCategoriesForm(activeCategory);

  useEffect(() => {
    setActiveCategory(formState);
  }, [formState])


  const onCloseModa = () => {
    cleanProductsSelected();
    closeCategoryModal();
  }

  const onSave = () => {
    addProducts(productsSelected);
    // TODO: crear y llamar función para subir a firebase
  }

  return (
    <Dialog
      className="modal-container-categories"
      open={isCategoryModalOpen}
      onClose={onCloseModa}
    >
      <DialogContent sx={{ maxHeight: 600, pl: .1, pr: .1 }}>
        <DialogTitle>Agregar Categoría</DialogTitle>
        <form className="category-form">
          <TextField
            type="text"
            fullWidth
            label="Nombre de Categoría"
            variant="outlined"
            name="categoryName"
            value={categoryName || ''}
            onChange={onInputChange}
          />
          <TextField
            fullWidth
            id="outlined-select-currency"
            select
            label="Productos relacionados"
            defaultValue=""
            onChange={onSelectProduct}
            helperText="Please select your currency"
          >
            {products.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {selected && <FloatingTags />}
          <div className="categories-modal-buttons">
            <div className="upload-files-container">
              <div className="files-name-container">
                {/* TODO: quitar este contenedor y sus estilos */}
              </div>
              <div className="iconImage-buttons">
                {/* TODO: corregir el error al no seleccionar imagen
                TODO: limitar los iconos a png */}
                <IconButton
                  className="addCategory-button"
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
                      src={activeCategory.image}
                    />
                  }
                </IconButton>
                <IconButton
                  className="addCategory-button"
                  color="primary"
                  aria-label="cargar icono"
                  component="label"
                  onChange={onUploadIcon}
                  sx={{ backgroundColor: "golden.main", color: "secondary.main", padding: iconLoad ? '3px' : '12px' }}
                >
                  <input hidden accept="image/*" type="file" />
                  <AddReactionIcon style={{ display: iconLoad ? 'none' : '' }} />
                  {iconLoad &&
                    <Avatar
                      alt="Icono"
                      src={activeCategory.icon}
                    />
                  }
                </IconButton>
              </div>
            </div>
            <div className="action-buttons">
              <Button
                className="cancelCategory-button"
                onClick={onCloseModa}
                variant="contained"
                sx={{ backgroundColor: "error.main" }}
              >
                Cancelar
              </Button>
              <Button
                className="addCategory-button"
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
