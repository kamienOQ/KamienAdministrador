import { useEffect, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent, Avatar, Typography, Alert, Grid } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddReactionIcon from '@mui/icons-material/AddReaction';

import { useCategoriesForm, useCategoriesState, useCategoriesStore, useUiStore } from "../../hooks"
import { deleteFileUpload } from "../../helpers";


export const CategoryModal = () => {

  const { closeCategoryModal, isCategoryModalOpen } = useUiStore();
  const { activeCategory, message, setActiveCategory, addErrorMessage1, addSuccessMessage1, 
    startUploadNewCategory } = useCategoriesStore();
  const { imageLoad, iconLoad, selected, onUploadImage, onUploadIcon } = useCategoriesState();

  const { categoryName, onInputChange, formState } = useCategoriesForm(activeCategory);
  const [emptyName, setEmptyName] = useState(false);


  useEffect(() => {
    setActiveCategory(formState);
    setEmptyName(false);
  }, [formState]);

  useEffect(() => {
    addErrorMessage1('');
    addSuccessMessage1('');
  }, [formState, imageLoad, iconLoad ]);
  
  

  const onCloseModa = () => {
    if (imageLoad) {
      deleteFileUpload(activeCategory.image.name);
    }
    if (iconLoad) {
      deleteFileUpload(activeCategory.icon.name);
    }

    closeCategoryModal();
  }

  const onSave = () => {
    if (activeCategory.categoryName === '') {
      setEmptyName(true);
    } else {
      startUploadNewCategory();
    }
  }

  return (
    <Dialog
      className="modal-container-categories"
      open={isCategoryModalOpen}
    >
      <DialogContent sx={{ maxHeight: 600, pl: .1, pr: .1 }}>
        <DialogTitle >Agregar Categoría</DialogTitle>
        <form className="category-form">
          <TextField
            type="text"
            fullWidth
            label="Nombre de Categoría"
            variant="outlined"
            name="categoryName"
            value={categoryName || ''}
            onChange={onInputChange}
            error={emptyName}
            helperText={emptyName ? 'Campo vacío' : ''}
          />
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
            <Grid item
              xs={12}
              display={!!message.error ? '' : 'none'}
            >
              <Alert severity='error'>{ message.error }</Alert>
            </Grid>
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
