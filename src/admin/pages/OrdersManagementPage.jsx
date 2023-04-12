import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Orders, OrdersView } from "../components";
import { useOrdersStore } from "../../hooks";

export const OrdersManagementPage = () => {
  const { filtering, startNumberOrders } = useOrdersStore();

  useEffect(() => {
    if(!filtering){
      startNumberOrders();
    }
  }, [filtering]);

  return (
    <Grid
      className="attributes-container"
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
          className="secundary-attributes-container"
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
      </Grid>
    </Grid>
  );
};
