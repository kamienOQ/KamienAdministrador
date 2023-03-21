import { Button, Grid, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLoadDataPage, useCategoriesStore, useUiStore } from "../../hooks";
import { Categories, CategoryFilters, CategoryModal } from "../";
import { useEffect } from "react";


export const CategoriesPages = () => {

  const { openCategoryModal, closeCategoryModal } = useUiStore();
  const { isSaving, message, addNewCategory, startGetCategories } = useCategoriesStore();

  useEffect(() => {
    if (!!message.success) {
      closeCategoryModal();
    }
  }, [message.success]);

  useEffect(() => {
    startGetCategories();
  }, [])


  // useEffect(() => {
  //     loadData();
  // }, [isCategoryModalOpen, page, ascending, categories])


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
          height: 450,
          marginLeft: "5%",
          maxWidth: "95%",
        }}
      >
        <Grid container
          className="secundary-categories-container"
          spacing={2}
          sx={{ padding: 4, mt: 8, borderRadius: 1.2 }}
        >
          <Grid item 
            sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography variant="h4">Gestión de Categorías</Typography>
            <Button
              className="addCategory-button"
              onClick={onOpenModal}
              startIcon={<AddCircleIcon />}
              sx={{ backgroundColor: 'golden.main', minWidth: 0, color: "tertiary.main" }}
              variant='contained'
              disabled={isSaving}
            >
              Nueva Categoría
            </Button>
          </Grid>
        </Grid>
        <Categories />
        <CategoryModal />
      </Grid>
    </Grid>
  )
}
