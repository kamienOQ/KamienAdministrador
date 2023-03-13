import { Button, Grid, Typography } from "@mui/material";

export const OrdersManagementPage = () => {
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
          Gestión de pedidos
        </Typography>
        <Button
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
