import { useEffect, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent, Avatar, Typography } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddReactionIcon from '@mui/icons-material/AddReaction';

import { useCategoriesForm, useCategoriesState, useCategoriesStore, useUiStore } from "../../hooks"
import { FloatingTags } from "./";
import { useDispatch } from "react-redux";
import { onStartUploadNewCategory } from "../../store";
import { deleteFileUpload } from "../../helpers/deleteFileUpload";

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
  const { activeCategory, addProducts, setActiveCategory, cleanCategories, startUploadNewCategory } = useCategoriesStore();
  const { imageLoad, iconLoad, selected, onUploadImage, onUploadIcon, onSelectProduct } = useCategoriesState();

  const { categoryName, onInputChange, formState } = useCategoriesForm(activeCategory);
  const [nombreVacio, setNombreVacio] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    setActiveCategory(formState);
    setNombreVacio(false);
  }, [formState])


  const onCloseModa = () => {
    if(imageLoad){
      deleteFileUpload(activeCategory.image.name)
    }
    if(iconLoad){
      deleteFileUpload(activeCategory.icon.name)
    }

    closeCategoryModal();
    cleanProductsSelected();
    cleanCategories();
  }

  const onSave = () => {
    if(activeCategory.categoryName === ''){
      setNombreVacio(true);
    }else{
      addProducts(productsSelected);
      startUploadFile();
    }
  }

  return (
    <Dialog
      className="modal-container-categories"
      open={isCategoryModalOpen}
      // onClose={onCloseModa}
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
            error={nombreVacio}
            helperText={ nombreVacio ? 'Campo vacío': '' }
          />
          <TextField
            fullWidth
            id="outlined-select-currency"
            select
            label="Productos relacionados"
            defaultValue=""
            onChange={onSelectProduct}
            helperText="Por favor seleccione los productos"
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
                <Typography>
                  Imagen
                </Typography>
                <Typography>
                  Icono
                </Typography>
              </div>
              <div className="iconImage-buttons">
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
                      src={activeCategory?.image.url}
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
                  <input hidden accept=".png" type="file" />
                  <AddReactionIcon style={{ display: iconLoad ? 'none' : '' }} />
                  {iconLoad &&
                    <Avatar
                      alt="Icono"
                      src={activeCategory?.icon.url}
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
