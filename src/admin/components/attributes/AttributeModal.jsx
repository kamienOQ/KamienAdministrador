import { useEffect, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, DialogContent, Alert, Grid,Autocomplete,MenuItem} from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { useAttributesForm, useAttributesState, useAttributesStore, useUiStore } from "../../../hooks";
import { deleteFileUpload } from "../../../helpers";


export const AttributeModal = () => {

  const { closeAttributeModal, isAttributeModalOpen } = useUiStore();
  const { attributes, activeAttribute, message, setActiveAttribute, addErrorMessage, addSuccessMessage, 
    startUploadNewAttribute } = useAttributesStore();
  const { imageLoad, iconLoad, selected, onUploadImage, onUploadIcon } = useAttributesState();

  const { attributeName,attributeList, onInputChange, formState } = useAttributesForm(activeAttribute);
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
  

  const onCloseModal = () => {
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
            label="Nombre del tipo de Atributo"
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
          <TextField
            fullWidth
            id="outlined-select-currency"
            select
            label="Categorias a las que pertenece"
            defaultValue=""
            onChange={onSelectProduct}
            helperText="Por favor, seleccione una opción"
          >
            {products.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={catt}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Categorias" />}
          >
            {/* importar y recorrer productsUploaded opteniendo el nombre */}
            {catt.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
            ))}
          </Autocomplete>
          <TextField
            type="text"
            fullWidth
            label="Agrega nuevos Atributo"
            variant="outlined"
            name="attributeList"
            value={attributeList || ''}
            onChange={onInputChange}
            error={emptyName}
            helperText={emptyName ? 'Ejemplo: Blanco, rojo, azul' : ''}
          >
            {/* importar y recorrer productsUploaded opteniendo el nombre */}
            {catt.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
            ))}
          </TextField>
          
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
                className="cancelProduct-button"
                onClick={onCloseModal}
                variant="contained"
                sx={{ borderRadius: '16px', m: 0.1 }}
                color="error.main"
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
