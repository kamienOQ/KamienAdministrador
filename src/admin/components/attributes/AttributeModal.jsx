import { useEffect, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent, Avatar, Typography, Alert, Grid, makeStyles, Select,Autocomplete } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import { useAttributesForm, useAttributesState, useAttributesStore, useAttUiStore } from "../../../hooks";
import { deleteFileUpload } from "../../../helpers";

const attributesCategories = [
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

export const AttributeModal = () => {

  const { closeCategoryModal, isCategoryModalOpen } = useAttUiStore();
  const { attributes, activeAttribute, message, editing, setActiveCategory, addErrorMessage, addSuccessMessage,
    startUploadNewCategory, startNumberCategories, changeEditing, changePreCategoryUpdated, startUpdateCategory, onSelectAttribute, selected} = useAttributesStore();
  const { imageLoad, setImageLoad, iconLoad, setIconLoad, onUploadImage, onUploadIcon} = useAttributesState();

  const { attributeName, onInputChange, formState } = useAttributesForm(activeAttribute);
  const [emptyName, setEmptyName] = useState(false);


  /*useEffect(() => {
    if(editing){
      if(activeAttribute.image.url){
        setImageLoad(true);
      }
      if(activeAttribute.icon.url){
        setIconLoad(true);
      }
    }
  }, []);*/

  useEffect(() => {
    setActiveCategory(formState);
    setEmptyName(false);
  }, [formState]);

  /*useEffect(() => {
    addErrorMessage('');
    addSuccessMessage('');
  }, [formState, imageLoad, iconLoad]);*/



  const onCloseModa = () => {
    /*if (imageLoad) {
      let usingImage = false;
      categories.forEach(object => {
        if (object.image.name === activeAttribute.image.name) {
          usingImage = true;
          return;
        }
      });
      if (!usingImage) {
        deleteFileUpload(activeAttribute.image.name);
      }
    }
    /*if (iconLoad) {
      let usingIcon = false;
      categories.forEach(object => {
        if (object.icon.name === activeAttribute.icon.name) {
          usingIcon = true;
          return;
        }
      });
      if (!usingIcon) {
        deleteFileUpload(activeAttribute.icon.name);
      }
    }*/
    
    closeCategoryModal();
    changeEditing(false);
    changePreCategoryUpdated(false);
  }

  const onSave = () => {
    console.log(activeAttribute);
    if (activeAttribute.attributeName === '') {
      setEmptyName(true);
    } else {
      if(!editing){
        startUploadNewCategory();
        startNumberCategories();
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
          {editing ? 'Editar un Atributo' : 'Agregar un nuevo Atributo'}
        </DialogTitle>
        <form  className="category-form">
          <TextField
            type="text"
            fullWidth
            label="Nombre del Atributo"
            variant="filled" 
            focused
            name="attributeName"
            value={attributeName || ''}
            onChange={onInputChange}
            error={emptyName}
            helperText={emptyName ? 'Campo vacío' : ''}
            sx={{ color: 'quaternary.main', '& label.Mui-focused': {color: 'quaternary.main'}, 
            '& .MuiFilledInput-underline:after': {borderBottomColor: 'quaternary.main'} }}
          />

          <TextField
            type="text"
            fullWidth
            label="Agrega nuevos Atributo"
            variant="filled" 
            focused
            name=""
            value=""
            onChange={onInputChange}
            error={emptyName}
            helperText={emptyName ? 'Ejemplo: Blanco, rojo, azul' : ''}
            sx={{ color: 'quaternary.main', '& label.Mui-focused': {color: 'quaternary.main'}, 
            '& .MuiFilledInput-underline:after': {borderBottomColor: 'quaternary.main'} }}
          />
          
          <TextField
            fullWidth
            id="outlined-select-currency"
            select
            multiple
            label="Categoría del Atributo" variant="filled" focused
            defaultValue=""
            onChange={onSelectAttribute}
            helperText="Por favor seleccione las categorías del Atributo"
            sx={{ color: 'quaternary.main', '& label.Mui-focused': {color: 'quaternary.main'}, 
            '& .MuiFilledInput-underline:after': {borderBottomColor: 'quaternary.main'} }}
          >
            {/* importar y recorrer productsUploaded opteniendo el nombre */}
            {attributesCategories.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {selected && <FloatingTags />}

          <div className="categories-modal-buttons">
            
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

  /*return (
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
          {editing ? 'Editar un Atributo' : 'Agregar un nuevo Atributo'}
        </DialogTitle>
        <form  className="category-form">
          <TextField
            type="text"
            fullWidth
            label="Nombre del Atributo"
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
                      src={activeAttribute?.image.url}
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
                      src={activeAttribute?.icon.url}
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
  ) */
}
