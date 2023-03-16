import { Button, Grid, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLoadDataPage, useProductsStore, useUiStore } from "../../hooks";
import { ProductFilters, ProductModal } from "../";
import { useEffect } from "react";


export const ProductPages = () => {

  const { isProductModalOpen, page, openProductModal, closeProductModal } = useUiStore();
  const { products, isSaving, message, ascending, addNewProduct, startGetProducts } = useProductsStore();
  const { loadData } = useLoadDataPage();

  useEffect(() => {
    if (!!message.success) {
      closeProductModal();
    }
  }, [message.success]);

  useEffect(() => {
    startGetProducts();
  }, [])

  useEffect(() => {
    loadData();
}, [isProductModalOpen, page, ascending, products])


const onOpenModal = () => {
  addNewProduct();
  openProductModal();
}

  return (
    <Grid
      className="products-container"
      container
      spacing={0}
      alignContent="start"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', color: 'secondary.main', mb: 0 }}
    >
      <Grid container>
        <Grid container
          alignItems="center"
          className="secundary-products-container"
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
            <Typography variant='h4'>Gestión de Productos</Typography>
          </Grid>

          <Grid item
            alignItems="center"
            justifyContent="center"
            sx={{ p: 2 }}
            xs={12}
            sm={4}
          >
            <Button
              className="addProduct-button"
              onClick={onOpenModal}
              startIcon={<AddCircleIcon />}
              sx={{ backgroundColor: 'golden.main', minWidth: 0 }}
              variant='contained'
              disabled={ isSaving }
            >
              Nuevo Producto
            </Button>
          </Grid>
        </Grid>
        <ProductModal/>
        <ProductFilters/>
      </Grid>
      
    </Grid>
  )
}
