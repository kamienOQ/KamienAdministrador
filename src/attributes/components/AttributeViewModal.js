import { useEffect, useRef, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, MenuItem, DialogContent, Alert, Grid  } from "@mui/material"
import {  useAttributesForm, useAttributesState, useAttributesStore, useUiStore } from "../../hooks"
import { FloatingTags } from ".";

export const AttributeModal = () => {

    const { closeAttributeModal, isAttributeModalOpen, categoriesSelected } = useUiStore();
    const { activeAttribute, message, addCategories, setActiveAttribute, addErrorMessage, addSuccessMessage, startUploadNewAttribute} = useAttributesStore();
    const { selected, onSelectCategory } = useAttributesState();
    const { attributeName, onInputChange, formState } = useAttributesForm(activeAttribute);
    const [emptyName, setEmptyName] = useState(false);
  
  
  
    useEffect(() => {
      setActiveAttribute(formState);
      setEmptyName(false);
    }, [formState]);
  
    useEffect(() => {
      addErrorMessage('');
      addSuccessMessage('');
    }, [formState, categoriesSelected]);
    
  
    const onCloseModal = () => {
      closeAttributeModal();
    }
    const onSave = () => {
      if (activeAttribute.attributeName === '') {
        setEmptyName(true);
      } else {
        addCategories(categoriesSelected);
        startUploadNewAttribute();
      }
    }
  
    return (
      <Dialog
        className="modal-container-attributes"
        open={isAttributeModalOpen}
      >
        <DialogContent sx={{maxHeight: 600, pl:.1, pr:.1 }}>
          <DialogTitle>Nuevo Atributo</DialogTitle>
          <form className="attribute-form">
          <TextField
              type="text"
              fullWidth
              label="Nombre del Atributo"
              variant="outlined"
              name="attributeName"
              value={attributeName || ''}
              onChange={onInputChange}
              error={emptyName}
              helperText={emptyName ? 'Campo vacío' : ''}
            />
            
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Categorias a las que pertenece"
              defaultValue=""
              onChange={onSelectCategory}
              helperText="Por favor, seleccione una opción"
            >
              {categories.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
  
            {selected && <FloatingTags/>}
            <div className="attributes-modal-buttons">
              <Grid item
                xs={12}
                display={!!message.error ? '' : 'none'}
              >
                <Alert severity='error'>{ message.error }</Alert>
              </Grid>
              <div className="action-buttons">
                <Button
                  className="cancelAttribute-button"
                  onClick={onCloseModal}
                  variant="contained"
                  sx={{ backgroundColor: "error.main" }}
                >
                  Cancelar
                </Button>
                <Button
                  className="addAttribute-button"
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