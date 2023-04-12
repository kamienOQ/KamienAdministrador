import { useEffect, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, DialogContent, Alert, Grid,Autocomplete} from "@mui/material"

import { useAttributesForm, useAttributesState, useAttributesStore, useUiStore } from "../../../hooks";
import { deleteFileUpload } from "../../../helpers";


export const AttributeModal = () => {

  const { closeAttributeModal, isAttributeModalOpen } = useUiStore();
  const { attributes, activeAttribute, message, setActiveAttribute, addErrorMessage, addSuccessMessage, 
    startUploadNewAttribute } = useAttributesStore();
  const { imageLoad, iconLoad, selected, onUploadImage, onUploadIcon } = useAttributesState();

  const { attributeName, onInputChange, formState } = useAttributesForm(activeAttribute);
  const [emptyName, setEmptyName] = useState(false);


  useEffect(() => {
    setActiveAttribute(formState);
    setEmptyName(false);
  }, [formState]);

  useEffect(() => {
    addErrorMessage('');
    addSuccessMessage('');
  }, [formState, imageLoad, iconLoad ]);

  
  const attTypes = [{label: "Tamaño"}, {label: "Color"}, {label: "Material"},{label: "Peso"},{label: "Volumen"},{label: "Diseño"},{label: "Medida"},{label: "Flexibilidad"},{label: "Duración"},{label: "Componentes"},{label: "Forma"}];
  const catt = [{label: "Reloj"}, {label: "Lentes"}, {label: "Perfumes"}];
  

  const onCloseModa = () => {
    if (imageLoad) {
      let usingImage = false;
      attributes.forEach(object => {
        if (object.image.name === activeAttribute.image.name) {
          usingImage = true;
          return;
        }
      });
      if(!usingImage){
        deleteFileUpload(activeAttribute.image.name);
      }
    }
    if (iconLoad) {
      let usingIcon = false;
      attributes.forEach(object => {
        if (object.icon.name === activeAttribute.icon.name) {
          usingIcon = true;
          return;
        }
      });
      if(!usingIcon){
        deleteFileUpload(activeAttribute.icon.name);
      }
    }

    closeAttributeModal();
  }

  const onSave = () => {
    if (activeAttribute.attributeName === '') {
      setEmptyName(true);
    } else {
      startUploadNewAttribute();
    }
  }

  return (
    <Dialog
      className="modal-container-attributes"
      open={isAttributeModalOpen}
      align="center"
    >
      <DialogContent >
        <DialogTitle variant="h7"  
          color= "#ffffff"
          sx={ { borderRadius: '16px', backgroundColor:"#000000" } }>
            Agregar un nuevo Atributo
        </DialogTitle>
        <form className="attribute-form">
          <TextField
            type="text"
            fullWidth
            label="Nombre de Atributo"
            variant="outlined"
            name="attributeName"
            value={attributeName || ''}
            onChange={onInputChange}
            error={emptyName}
            helperText={emptyName ? 'Campo vacío' : ''}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={attTypes}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Tipo de Atributo" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={catt}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Categorias" />}
          />
          
          {selected && <FloatingTags />}
          <div className="attributes-modal-buttons">
            
            <Grid item
              xs={12}
              display={!!message.error ? '' : 'none'}
            >
              <Alert severity='error'>{ message.error }</Alert>
            </Grid>
            <div className="action-buttons">
              <Button
                className="cancelAtrribute-button"
                onClick={onCloseModa}
                variant="contained"
                sx={{ backgroundColor: "error.main" }}
              >
                Cancelar
              </Button>
              <Button
                className="addAttribute-button"
                onClick={onSave}
                variant="contained"
                sx={{ backgroundColor: "primary.main", color: "tertiary.main" }}
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
