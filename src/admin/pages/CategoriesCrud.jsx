import { Button, Grid, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from "react";
import { useCategoriesStore, useUiStore } from "../../hooks";
import { Categories, CategoryModal, CategoryView } from "../components";


export const CategoriesCrud = () => {
  const { openCategoryModal, closeCategoryModal, isCategoryModalOpen } = useUiStore();
  const { isSaving, message, filtering, addNewCategory, startGetCategories, startNumberCategories } = useCategoriesStore();

  useEffect(() => {
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
    startGetCategories();
  }, [])

  const onOpenModal = () => {
    addNewCategory();
    openCategoryModal();
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
            <Typography variant="h4">Gestión de Categorías</Typography>
            <Button
              className="addCategory-modal-button"
              onClick={onOpenModal}
              startIcon={<AddCircleIcon />}
              sx={{ backgroundColor: 'success.main', minWidth: 0, color: "tertiary.main" }}
              variant='contained'
              disabled={isSaving}
            >
              Nueva Categoría
            </Button>
          </Grid>
        </Grid>
        <Categories />
        {isCategoryModalOpen && 
          <CategoryModal />
        }
        <CategoryView/>
      </Grid>
    </Grid>
  )
}