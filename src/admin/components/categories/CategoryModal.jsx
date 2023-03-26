import { useEffect, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent, Avatar, Typography, Alert, Grid, makeStyles } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import { useCategoriesForm, useCategoriesState, useCategoriesStore, useUiStore } from "../../../hooks";
import { deleteFileUpload } from "../../../helpers";


export const CategoryModal = () => {

  const { closeCategoryModal, isCategoryModalOpen } = useUiStore();
  const { categories, activeCategory, message, editing, setActiveCategory, addErrorMessage, addSuccessMessage,
    startUploadNewCategory, changeEditing, changePreCategoryUpdated, startUpdateCategory } = useCategoriesStore();
  const { imageLoad, setImageLoad, iconLoad, setIconLoad, onUploadImage, onUploadIcon } = useCategoriesState();

  const { categoryName, onInputChange, formState } = useCategoriesForm(activeCategory);
  const [emptyName, setEmptyName] = useState(false);


  useEffect(() => {
    if(editing){
      if(activeCategory.image.url){
        setImageLoad(true);
      }
      if(activeCategory.icon.url){
        setIconLoad(true);
      }
    }
  }, []);

  useEffect(() => {
    setActiveCategory(formState);
    setEmptyName(false);
  }, [formState]);

  useEffect(() => {
    addErrorMessage('');
    addSuccessMessage('');
  }, [formState, imageLoad, iconLoad]);



  const onCloseModa = () => {
    if (imageLoad) {
      let usingImage = false;
      categories.forEach(object => {
        if (object.image.name === activeCategory.image.name) {
          usingImage = true;
          return;
        }
      });
      if (!usingImage) {
        deleteFileUpload(activeCategory.image.name);
      }
    }
    if (iconLoad) {
      let usingIcon = false;
      categories.forEach(object => {
        if (object.icon.name === activeCategory.icon.name) {
          usingIcon = true;
          return;
        }
      });
      if (!usingIcon) {
        deleteFileUpload(activeCategory.icon.name);
      }
    }
    
    closeCategoryModal();
    changeEditing(false);
    changePreCategoryUpdated(false);
  }

  const onSave = () => {
    if (activeCategory.categoryName === '') {
      setEmptyName(true);
    } else {
      if(!editing){
        startUploadNewCategory();
        changePreCategoryUpdated(false);
      }if(editing){
        startUpdateCategory();
      }
    }
  }

  return (
    <Dialog
      className="modal-container-categories"
      open={isCategoryModalOpen}
      align="center"
    >
      <DialogContent>
        <DialogTitle
          variant="h7"
          
          sx={{ borderRadius: '16px', backgroundColor: "dark.main", color: "tertiary.main" }}
        >
          {editing ? 'Editar una Categoría' : 'Agregar una nueva Categoría'}
        </DialogTitle>
        <form  className="category-form">
          <TextField
            type="text"
            fullWidth
            label="Nombre de Categoría"
            variant="filled" 
            focused
            name="categoryName"
            value={categoryName || ''}
            onChange={onInputChange}
            error={emptyName}
            helperText={emptyName ? 'Campo vacío' : ''}
            sx={{ color: 'quaternary.main', '& label.Mui-focused': {color: 'quaternary.main'}, 
            '& .MuiFilledInput-underline:after': {borderBottomColor: 'quaternary.main'} }}
          />

          <div className="categories-modal-buttons">
            <div className="upload-files-container">
              <div className="files-name-container">
                <Typography sx={{ color: "quaternary.main", fontWeight: 'bold' }}>
                  Imagen
                </Typography>
                <Typography sx={{ color: "quaternary.main", fontWeight: 'bold' }}>
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
                  sx={{ color: "secondary.main", padding: imageLoad ? '3px' : '12px' }}
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
                  sx={{ color: "secondary.main", padding: iconLoad ? '3px' : '12px' }}
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
              <Alert severity='error'>{message.error}</Alert>
            </Grid>
            <div className="action-buttons">
              <Button
                className="cancelCategory-button"
                onClick={onCloseModa}
                variant="contained"
                sx={{ backgroundColor: "error.main", borderRadius: 20 }}
              >
                <CloseIcon />
              </Button>

              <Button
                className="addCategory-modal-button"
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
