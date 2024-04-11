import { Alert, Button, Grid, Snackbar, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from "react";
import { useProductsStore, useUiStore } from "../../hooks";
import { ProductModal, Products, ProductView } from "../components/products";


export const ProductsCrud = () => {

  const { openProductModal, closeProductModal, isProductModalOpen, attributesSelected } = useUiStore();
  const { isSaving, message, filtering, addNewProduct, startGetProducts, startNumberProducts,
    starGetCategoriesForm, startGetAttributesForm, startGetListAttributesForm, changeCreateSuccess,
    changeEditSuccess, createSuccess, editSuccess, } = useProductsStore();

  useEffect(() => {
    if (!!message.success) {
      closeProductModal();
    }
  }, [message.success]);

  useEffect(() => {
    if (!filtering) {
      startNumberProducts();
    }
  }, [filtering])

  useEffect(() => {
    startGetProducts();
  }, [])

  useEffect(() => {
    startGetListAttributesForm();
  }, [attributesSelected]);


  const onOpenModal = () => {
    addNewProduct();
    openProductModal();
    starGetCategoriesForm();
    startGetAttributesForm();
  }

  const handleCloseEditMessage = () => {
    changeEditSuccess(false);
  };

  const handleCloseCreateMessage = () => {
    changeCreateSuccess(false);
  };

  return (
    <>
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
        className="products-container"
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
            className="secundary-products-container"
            spacing={2}
            sx={{ padding: 4, mt: 8, borderRadius: 1.2, display: 'flex', direction: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <Grid item
              sx={{ width: "90%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography variant="h4">Gestión de Productos</Typography>
              <Button
                className="addProduct-modal-button"
                onClick={onOpenModal}
                startIcon={<AddCircleIcon />}
                sx={{ backgroundColor: 'success.main', minWidth: 0, color: "tertiary.main" }}
                variant='contained'
                disabled={isSaving}
              >
                Nuevo Producto
              </Button>
            </Grid>
          </Grid>
          <Products />
          {isProductModalOpen &&
            <ProductModal />
          }
          <ProductView />
        </Grid>
      </Grid>
    </>
  )
}
