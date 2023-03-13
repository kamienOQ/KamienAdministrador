import { Button, Grid, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useCategoriesStore, useUiStore } from "../../hooks";
import { Category, CategoryFilters, CategoryModal } from "../";
import { useEffect } from "react";


export const CategoriesPages = () => {

  const { openCategoryModal, closeCategoryModal} = useUiStore();
  const { isSaving, message, addNewCategory } = useCategoriesStore();

  useEffect(() => {
    if (!!message.success) {
      closeCategoryModal();
    }
  }, [message.success]);

  const onOpenModal = () => {
    addNewCategory();
    // TODO: (starGetProductsUploaded)cargar al estado todo los productos que se han subido a la base de datos
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
        <Grid
          alignItems="center"
          className="secundary-categories-container"
          container
          direction="column"
          justifyContent="center"
          spacing={2}
          sx={{ m: 2, padding: 4, maxHeight: 20, backgroundColor: 'darkGray.main', borderRadius: 1.2 }}

        >
          {/* TODO: justify-content: space-between */}
          <Grid
            alignItems="center"
            item
            justifyContent="center"
            sx={{ p: 2 }}
            xs={12}
            sm={4}
          >
            <Typography variant='h4'>Gestión de Categorías</Typography>
          </Grid>

          <Grid
            alignItems="center"
            item
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
