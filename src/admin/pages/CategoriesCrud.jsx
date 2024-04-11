import { Alert, Button, Grid, Snackbar, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from "react";
import { useCategoriesStore, useUiStore } from "../../hooks";
import { Categories, CategoryModal, CategoryView } from "../components";

export const CategoriesCrud = () => {
  const { openCategoryModal, closeCategoryModal, isCategoryModalOpen, isModalViewOpen } = useUiStore();
  const { isSaving, message, filtering, addNewCategory, startGetCategories, startNumberCategories,
    changeEditSuccess, changeCreateSuccess, createSuccess, editSuccess } = useCategoriesStore();

  useEffect(() => {
    if (!!message.success) {
      closeCategoryModal();
    }
  }, [message.success]);

  useEffect(() => {
    if (!filtering) {
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

  const handleCloseEditMessage = () => {
    changeEditSuccess(false);
  };

  const handleCloseCreateMessage = () => {
    changeCreateSuccess(false);
  };

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
        <Snackbar open={editSuccess} autoHideDuration={3000} onClose={handleCloseEditMessage} sx={{ alignItems: "flex-start", mt: "42px" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}>
          <Alert onClose={handleCloseEditMessage} severity="success" sx={{ width: '100%' }}>
            Se editó correctamente
          </Alert>
        </Snackbar>

        <Snackbar open={createSuccess} autoHideDuration={3000} onClose={handleCloseCreateMessage} sx={{ alignItems: "flex-start", mt: "42px" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}>
          <Alert onClose={handleCloseCreateMessage} severity="success" sx={{ width: '100%' }}>
            Se creó correctamente
          </Alert>
        </Snackbar>

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
        {isModalViewOpen &&
          <CategoryView />
        }
      </Grid>
    </Grid>
  )
}