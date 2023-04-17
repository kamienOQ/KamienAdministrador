import { useEffect, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, MenuItem, DialogContent, Avatar, Typography, Alert, Grid, makeStyles, Select,Autocomplete, IconButton } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useAttributesForm, useAttributesState, useAttributesStore, useAttUiStore } from "../../../hooks";

import { deleteFileUpload } from "../../../helpers";
import { FloatingTags, FloatingTagsAttributes } from "./";

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
    startUploadNewCategory, startNumberCategories, changeEditing, changePreCategoryUpdated, startUpdateCategory} = useAttributesStore();
  const { imageLoad, setImageLoad, iconLoad, setIconLoad, onUploadImage, onUploadIcon, onSelectCategories, onSelectAttributes } = useAttributesState();

  const { attributeName, categoriesRelated, attributesList, onInputChange, formState } = useAttributesForm(activeAttribute);
  const [emptyName, setEmptyName] = useState(false);
  

  useEffect(() => {
    setActiveCategory(formState);
    setEmptyName(false);
  }, [formState]);

  const onAddAttribute = () => {
    if(!!attributesList){
      onSelectAttributes(attributesList);
    }
  } 

  const onCloseModa = () => {   
    closeCategoryModal();
    changeEditing(false);
    changePreCategoryUpdated(false);
  }

  const onSave = () => {
    console.log(activeAttribute.categoriesRelated);
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

          <div className="container-add-attributes">
            <TextField
              type="text"
              fullWidth
              label="Agrega nuevos Atributo"
              variant="filled"
              focused
              name="attributesList"
              value={attributesList || ''}
              onChange={onInputChange}
              error={emptyName}
              helperText={emptyName ? 'Ejemplo: Blanco, rojo, azul' : ''}
              sx={{ color: 'quaternary.main', '& label.Mui-focused': {color: 'quaternary.main'}, 
              '& .MuiFilledInput-underline:after': {borderBottomColor: 'quaternary.main'} }}
            />

              <Button
                className="addAttribute-modal-button"
                variant="contained"
                onClick={onAddAttribute}
                sx={{ backgroundColor: "info.main", color: "tertiary.main", borderRadius: 50, height: 40}}
              >
                <AddCircleIcon />
              </Button>
          </div>
          <FloatingTagsAttributes></FloatingTagsAttributes>
          <TextField
            fullWidth
            id="outlined-select-currency"
            select
            label="Categoría del Atributo" variant="filled" focused
            defaultValue=""
            onChange={onSelectCategories}
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
          <FloatingTags />

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
}
