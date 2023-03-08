import { useEffect, useRef, useState } from "react";
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddReactionIcon from '@mui/icons-material/AddReaction';

import { useCategoriesForm, useCategoriesState, useCategoriesStore, useUiStore } from "../../hooks"
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

  const { closeCategoryModal, isCategoryModalOpen, cleanProductsSelected, productsSelected } = useUiStore();
  const { activeCategory, addImages, addProducts, setActiveCategory } = useCategoriesStore();
  // const [imageLoad, setImageLoad] = useState(false);
  // const [iconLoad, setIconLoad] = useState(false);
  // const [selected, setSelected] = useState(false);


  // const imageInputRef = useRef();
  // const iconInputRef = useRef();

  const { categoryName, onInputChange, formState } = useCategoriesForm(activeCategory);
  const { imageLoad, iconLoad, selected, imageInputRef, iconInputRef, onUploadImage, onUploadIcon, onSelectProduct } = useCategoriesState()

  useEffect(() => {
    setActiveCategory(formState);
  }, [formState])

  // useEffect(() => {
  //   setImageLoad(false);
  //   setIconLoad(false);
  //   setSelected(false);
  //   cleanProductsSelected();

  // }, [isCategoryModalOpen])


  // const onUploadImage = ({ target }) => {
  //   setImageLoad(target.files[0]);
  //   ImageInputRef.current.value = target.files[0].name;
  // }

  // const onUploadIcon = ({ target }) => {
  //   setIconLoad(target.files[0]);
  //   IconInputRef.current.value = target.files[0].name;
  // }

  // const onSelectProduct = ({ target }) => {
  //   addProductsSelected(target.value);
  //   setSelected(true);
  // }

  const onCloseModa = () => {
    cleanProductsSelected();
    closeCategoryModal();
  }

  const onSave = () => {
    //TODO: Realizar metodo en el slice para guardar imagen, icono y procutos
    // addImages(imageLoad);
    // addImages([...iconLoad]);
    addProducts(productsSelected);
  }

  return (
    <Dialog
      className="modal-container-categories"
      open={isCategoryModalOpen}
      onClose={onCloseModa}
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
            value={ categoryName || '' }
            onChange={onInputChange}
          />
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

          {selected && <FloatingTags />}
          <div className="categories-modal-buttons">
            <div className="upload-files-container">
              <div className="files-name-container">
                <input
                  type="text"
                  ref={imageInputRef}
                  style={{
                    visibility: !!imageLoad ? '' : 'hidden'
                  }}
                />
                <input
                  type="text"
                  ref={iconInputRef}
                  style={{
                    visibility: !!iconLoad ? '' : 'hidden'
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
