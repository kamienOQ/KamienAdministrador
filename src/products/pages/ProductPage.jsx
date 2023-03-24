import { Button, Grid, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLoadDataPage, useProductsStore, useUiStore } from "../../hooks";
import { ProductModal, Product } from "../";
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
              className="addProduct-button"
              onClick={onOpenModal}
              startIcon={<AddCircleIcon />}
              sx={{ backgroundColor: '#357a38', minWidth: 0, color: "#ffffff" }}
              variant='contained'
              disabled={isSaving}
            >
              Nuevo Producto
            </Button>
          </Grid>
        </Grid>
        <Product />
        <ProductModal />
      </Grid>
    </Grid>
  )
}
