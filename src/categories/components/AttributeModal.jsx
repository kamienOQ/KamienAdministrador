import { useEffect, useRef, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { useUiStore } from "../../hooks"
import { FloatingTags } from ".";

const products = [
  {
    label: 'Reloj'
  },
  {
    label: 'Perfumes'
  },
  {
    label: 'Lentes'
  }
];

export const AttributyModal = () => {

  const { closeAttributeModal, isAttributeModalOpen, productsSelected, addProductsSelected, cleanProductsSelected } = useUiStore();
  const [imageLoad, setImageLoad] = useState(false);
  const [iconLoad, setIconLoad] = useState(false);
  const [selected, setSelected] = useState(false);
  // const [selectedProducts, setSelectedProducts] = useState([]);

  const ImageInputRef = useRef();
  const IconInputRef = useRef();

  useEffect(() => {
    setImageLoad(false);
    setIconLoad(false);
    setSelected(false);
    cleanProductsSelected();

  }, [isAttributeModalOpen])


  const onUploadImage = ({ target }) => {
    setImageLoad(true);
    ImageInputRef.current.value = target.files[0].name;
  }

  const onUploadIcon = ({ target }) => {
    setIconLoad(true);
    IconInputRef.current.value = target.files[0].name;
  }

  const onSelectProduct = ({ target }) => {
    addProductsSelected(target.value);
    setSelected(true);
  }

  const onCloseModa = () => {
    cleanProductsSelected();
    closeAttributeModal();
  }

  return (
    <Dialog
      className="modal-container-attributes"
      open={isAttributeModalOpen}
      onClose={closeAttributeModal}
    >
      <DialogContent sx={{maxHeight: 600, pl:.1, pr:.1 }}>
        <DialogTitle>Nuevo Atributo</DialogTitle>
        <form className="attribute-form">
          <TextField fullWidth label="Nombre del Atributo" variant="outlined"></TextField>
          <TextField
            fullWidth
            id="outlined-select-currency"
            select
            label="Attributias a las que pertenece"
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

          {selected && <FloatingTags/>}
          <div className="attributes-modal-buttons">
            <div className="upload-files-container">
              <div className="files-name-container">
                <input
                  type="text"
                  ref={ImageInputRef}
                  style={{
                    visibility: imageLoad ? '' : 'hidden'
                  }}
                />
                <input
                  type="text"
                  ref={IconInputRef}
                  style={{
                    visibility: iconLoad ? '' : 'hidden'
                  }}
                />
              </div>
              
            </div>
            <div className="action-buttons">
              <Button
                className="cancelAttribute-button"
                onClick={onCloseModa}
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
