import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { Orders } from "../components";
import { startGetOrders } from "../../store/orders";

export const OrdersManagementPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetOrders(1));
  }, []);

  return (
    <Grid
      className="categories-container"
      container
      spacing={0}
      alignContent="start"
    >
      <Grid
        container
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
      </Grid>
    </Grid>
  );
};
