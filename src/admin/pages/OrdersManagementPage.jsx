import { useEffect } from "react";
import { Alert, Grid, Snackbar, Typography } from "@mui/material";
import { Orders, OrdersView } from "../components";
import { useOrdersStore } from "../../hooks";
import { OrdersEdit } from "../components/orders/OrderEdit";

export const OrdersManagementPage = () => {
  const { filtering, startNumberOrders, changeEditSuccess, editSuccess } = useOrdersStore();

  useEffect(() => {
    if (!filtering) {
      startNumberOrders();
    }
  }, [filtering]);

  const handleClose = () => {
    changeEditSuccess(false);
  };

  return (
    <>
      <Snackbar open={editSuccess} autoHideDuration={3000} onClose={handleClose} sx={{ alignItems: "flex-start", mt: "42px" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Se editó correctamente
        </Alert>
      </Snackbar>
      <Grid
        className="categories-container"
        container
        spacing={0}
        alignContent="start"
      >
        <Grid
          container
          className="table-container"
          sx={{
            height: 400,
            marginLeft: "5%",
            maxWidth: "95%",
          }}
        >
          <Grid
            alignItems="center"
            className="secundary-categories-container"
            container
            justifyContent="space-around"
            spacing={2}
            sx={{ padding: 4, mt: 8, borderRadius: 1.2 }}
          >
            <Grid item textAlign="center">
              <Typography variant="h4">Gestión de Pedidos</Typography>
            </Grid>
          </Grid>
          <Orders />
          <OrdersView />
          <OrdersEdit />
        </Grid>
      </Grid>
    </>
  );
};