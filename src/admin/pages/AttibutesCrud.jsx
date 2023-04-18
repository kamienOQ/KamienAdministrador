import { Button, Grid, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useEffect } from "react";
import { useAttributesStore, useAttUiStore } from "../../hooks";
import { Attributes, AttributeModal, AttributeView } from "../components";





export const AttibutesCrud = () => {
  const { openCategoryModal, closeCategoryModal, isCategoryModalOpen } = useAttUiStore();
  const { isSaving, message, filtering, addNewCategory, startGetAttributes, startNumberCategories,starGetCategoriesForm } = useAttributesStore();

  

  useEffect(() => {
    console.log('Cambió')
    if (!!message.success) {
      closeCategoryModal();
    }
  }, [message.success]);

  useEffect(() => {
    if(!filtering){
      startNumberCategories();
    }
  }, [filtering])
  

  useEffect(() => {
    startGetAttributes();
  }, [])

  const onOpenModal = () => {
    addNewCategory();
    openCategoryModal();
    starGetCategoriesForm();
  }

  return (
    <Grid container
      className="categories-container"
      spacing={0}
      alignContent="start"
    >
      <Grid container
        sx={{
          height: 400,
          marginLeft: "5%",
          maxWidth: "95%",
        }}
      >
        <Grid container
          className="secundary-categories-container"
          spacing={2}
          sx={{ padding: 4, mt: 8, borderRadius: 1.2, display: 'flex', direction: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid item 
            sx={{ width: "90%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography variant="h4">Gestión de Atributos</Typography>
            <Button
              className="addCategory-modal-button"
              onClick={onOpenModal}
              startIcon={<AddCircleIcon />}
              sx={{ backgroundColor: 'success.main', minWidth: 0, color: "tertiary.main" }}
              variant='contained'
              disabled={isSaving}
            >
              Nuevo Atributo
            </Button>
          </Grid>
        </Grid>
        <Attributes />
        {isCategoryModalOpen && 
          <AttributeModal />
        }
        <AttributeView/>
      </Grid>
    </Grid>
  )
}