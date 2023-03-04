import { Button, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { startLogout } from "../../store/auth";

export const OrdersManagementPage = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          width: { sm: 360 },
          backgroundColor: "white",
          padding: 5,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h1"
          fontSize="32px"
          textAlign="center"
          sx={{ mb: 1 }}
        >
          Orders Management
        </Typography>
        <Button
          onClick={onLogout}
          variant="contained"
          fullWidth
          color="secondary"
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "16px",
            color: "#ffffff",
            "&:hover": {
              bgcolor: "#ffe34f",
            },
          }}
        >
          Cerrar Sesión
        </Button>
      </Grid>
    </Grid>
  );
};
