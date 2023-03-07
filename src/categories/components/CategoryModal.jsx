import { useEffect, useRef, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { useUiStore } from "../../hooks"
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

  const { closeCategoryModal, isCategoryModalOpen, productsSelected, addProductsSelected, cleanProductsSelected } = useUiStore();
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

  }, [isCategoryModalOpen])


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
    closeCategoryModal();
  }

  return (
    <Dialog
      className="modal-container-categories"
      open={isCategoryModalOpen}
      onClose={closeCategoryModal}
    >
      <DialogContent sx={{maxHeight: 600, pl:.1, pr:.1 }}>
        <DialogTitle>Agregar Categoría</DialogTitle>
        <form className="category-form">
          <TextField fullWidth label="Nombre de Categoría" variant="outlined"></TextField>
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

          {selected && <FloatingTags/>}
          <div className="categories-modal-buttons">
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
              <div className="iconImage-buttons">
                <IconButton
                  className="addCategory-button"
                  color="primary"
                  aria-label="cargar imagen"
                  component="label"
                  onChange={onUploadImage}
                  sx={{ backgroundColor: "golden.main", color: "secondary.main", padding: 1.5 }}
                >
                  <input hidden accept="image/*" type="file" />
                  <AddPhotoAlternateIcon />
                </IconButton>
                <IconButton
                  className="addCategory-button"
                  color="primary"
                  aria-label="cargar icono"
                  component="label"
                  onChange={onUploadIcon}
                  sx={{ backgroundColor: "golden.main", color: "secondary.main", padding: 1.5 }}
                >
                  <input hidden accept="image/*" type="file" />
                  <AddReactionIcon />
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
