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
                sx={{ 
                  backgroundColor: 'success.main', 
                  minWidth: 0, 
                  marginRight: 28, 
                  color: "tertiary.main",
                  '@media (min-width: 300px) and (min-height: 600px)': {
                    marginRight: -18,
                  },
                  '@media (min-width: 360px) and (min-height: 600px)': {
                    marginRight: -20,
                  },
                  '@media (min-width: 375px) and (min-height: 600px)': {
                    marginRight: -21,
                  },
                  '@media (min-width: 390px) and (min-height: 600px)': {
                    marginRight: -23,
                  },
                  '@media (min-width: 400px) and (min-height: 600px)': {
                    marginRight: -5,
                  },
                  '@media (min-width: 500px) and (min-height: 600px)': {
                    marginRight: -6,
                  },
                  '@media (min-width: 700px) and (min-height: 600px)': {
                    marginRight: -4,
                  },
                  '@media (min-width: 800px) and (min-height: 600px)': {
                    marginRight: -5,
                  },
                  '@media (min-width: 900px) and (min-height: 600px)': {
                    marginRight: -5,
                  },
                  '@media (min-width: 1024px) and (min-height: 600px)': {
                    marginRight: -6,
                  },
                  '@media (min-width: 1024px) and (min-height: 800px)': {
                    marginRight: 1,
                  },
                  '@media (min-width: 1024px) and (min-height: 900px)': {
                    marginRight: -5,
                  },
                  '@media (min-width: 1024px) and (min-height: 1000px)': {
                    marginRight: -6,
                  },
                  '@media (min-width: 1100px)': {
                    marginRight: -6,
                  }, 
                  '@media (min-width: 1200px)': {
                    marginRight: -6,
                  }, 
                  '@media (min-width: 1300px)': {
                    marginRight: -5,
                  }, 
                  '@media (min-width: 1350px)': {
                    marginRight: -2,
                  }, 
                  '@media (min-width: 1390px)': {
                    marginRight: 0,
                  }, 
                  '@media (min-width: 1400px)': {
                    marginRight: 9,
                  }, 
                  '@media (min-width: 1500px)': {
                    marginRight: 10,
                  }, 
                  '@media (min-width: 1600px)': {
                    marginRight: 14,
                  }, 
                  '@media (min-width: 1800px)': {
                    marginRight: 28,
                  },
                }}
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
