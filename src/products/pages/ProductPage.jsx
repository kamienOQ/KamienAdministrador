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
      sx={{ backgroundColor: '#ffffff' }}
      marginLeft={"4%"}
      marginTop={"4%"}
      marginRight={"4%"}
      maxWidth={"96%"}
    >
      <Grid container>
        <Grid container
          alignItems="center"
          className="secundary-products-container"
          //direction="column"
          justifyContent="center"
          spacing={2}
          sx={{ m: 2, padding: 2, maxHeight: 20, backgroundColor: '#ffffff' }}

        >
          {/* TODO: justify-content: space-between */}
          <Grid item
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant='h4'>Gestión de Productos</Typography>
          </Grid>
        </Grid>
        <Grid item
            alignItems="center"
            justifyContent="center"
            marginLeft={"70%"}
            marginTop={"1%"}
          >
            <Button
              className="addProduct-button"
              onClick={onOpenModal}
              startIcon={<AddCircleIcon />}
              sx={{  borderRadius: '16px', backgroundColor: '#000000', color: '#ffffff',minWidth: 0 }}
              variant='contained'
              disabled={ isSaving }
            >
              Nuevo Producto
            </Button>
          </Grid>
        <ProductModal/>
        <ProductFilters/>
      </Grid>
      
    </Grid>
  )
}
