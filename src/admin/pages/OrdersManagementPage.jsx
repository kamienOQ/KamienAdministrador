import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { OrdersManagementFilters } from "../components/OrdersManagementFilters";
import { startGetOrders } from "../../store/orders";

export const OrdersManagementPage = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(null);

  useEffect(() => {
    dispatch(startGetOrders(1));
  }, []);

  const onToggleButton = (event, newValues) => {
    setValue(newValues);
  };

  return (
    <Grid
      className="categories-container"
      container
      spacing={0}
      alignContent="start"
    >
      <Grid container>
        <Grid
          alignItems="center"
          className="secundary-categories-container"
          container
          justifyContent="space-around"
          spacing={2}
          sx={{ padding: 4, mt: 8, borderRadius: 1.2 }}
        >
          {/* TODO: justify-content: space-between */}
          <Grid
            alignItems="center"
            item
            justifyContent="center"
            sx={{ p: 2, textAlign: "center" }}
            xs={12} sm={6} md={4}
          >
            <Typography variant='h4'>Gestión de Pedidos</Typography>
          </Grid>

          <Grid
            alignItems="center"
            item
            justifyContent="center"
            sx={{ p: 2 }}
          >
            <ToggleButtonGroup
              value={value}
              onChange={onToggleButton}
              exclusive
              xs={12} sm={6} md={4}
            >
              <ToggleButton value="cancelado">Cancelado</ToggleButton>
              <ToggleButton value="pendiente">Pendiente</ToggleButton>
              <ToggleButton value="en envio">En Envío</ToggleButton>
              <ToggleButton value="entregado">Entregado</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <OrdersManagementFilters/>
      </Grid>
      
    </Grid>
  );
};
