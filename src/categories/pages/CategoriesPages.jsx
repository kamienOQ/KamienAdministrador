import { Button, Grid, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLoadDataPage, useCategoriesStore, useUiStore } from "../../hooks";
import { CategoryFilters, CategoryModal } from "../";
import { useEffect } from "react";


export const CategoriesPages = () => {

  const { isCategoryModalOpen, page, openCategoryModal, closeCategoryModal } = useUiStore();
  const { categories, isSaving, message, ascending, addNewCategory, startGetCategories } = useCategoriesStore();
  const { loadData } = useLoadDataPage();

  useEffect(() => {
    if (!!message.success) {
      closeCategoryModal();
    }
  }, [message.success]);

  useEffect(() => {
    startGetCategories();
  }, [])
  

  useEffect(() => {
      loadData();
  }, [isCategoryModalOpen, page, ascending, categories])
  

  const onOpenModal = () => {
    addNewCategory();
    openCategoryModal();
  }

  return (
    <Grid
      className="categories-container"
      container
      spacing={0}
      alignContent="start"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', color: 'secondary.main', mb: 0 }}
    >
      <Grid container>
        <Grid container
          alignItems="center"
          className="secundary-categories-container"
          direction="column"
          justifyContent="center"
          spacing={2}
          sx={{ m: 2, padding: 4, maxHeight: 20, backgroundColor: 'darkGray.main', borderRadius: 1.2 }}

        >
          {/* TODO: justify-content: space-between */}
          <Grid item
            alignItems="center"
            justifyContent="center"
            sx={{ p: 2 }}
            xs={12}
            sm={4}
          >
            <Typography variant='h4'>Gestión de Categorías</Typography>
          </Grid>

          <Grid item
            alignItems="center"
            justifyContent="center"
            sx={{ p: 2 }}
            xs={12}
            sm={4}
          >
            <Button
              className="addCategory-button"
              onClick={onOpenModal}
              startIcon={<AddCircleIcon />}
              sx={{ backgroundColor: 'golden.main', minWidth: 0 }}
              variant='contained'
              disabled={ isSaving }
            >
              Nueva Categoría
            </Button>
          </Grid>
        </Grid>
        <CategoryModal/>
        <CategoryFilters/>
      </Grid>
      
    </Grid>
  )
}
