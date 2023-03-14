import { Button, Grid, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useProductsStore, useUiStore } from "../../hooks";
import { ProductModal } from "../";
import { useEffect } from "react";


export const ProductPages = () => {

  const { openProductModal, closeProductModal} = useUiStore();
  const { isSaving, message, addNewProduct } = useProductsStore();

  useEffect(() => {
    if (!!message.success) {
      closeProductModal();
    }
  }, [message.success]);

  const onOpenModal = () => {
    addNewProduct();
    // TODO: (starGetProductsUploaded)cargar al estado todo los productos que se han subido a la base de datos
    openProductModal();  
  }

  return (
    <Grid
      className="products-container"
      container
      spacing={0}
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', color: 'secondary.main' }}
    >
      <Grid
        alignItems="center"
        className="box-border secundary-products-container"
        container
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ m: 2, padding: 4, maxHeight: 20 }}

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
          <Typography variant='h4'>Gestión de Productos</Typography>
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
    </Grid>
  )
}
