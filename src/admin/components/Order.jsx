import { Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const Order = () => {
  return (
    <Grid
      container
      sx={{
        flexWrap: "nowrap",
        bl: 1,
        border: 1,
        borderTop: 0,
      }}
    >
      <Grid
        item
        sx={{
          width: "5%",
          borderRight: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 0.5,
          pb: 0.5,
        }}
      >
        1
      </Grid>
      <Grid
        item
        sx={{
          width: "20%",
          borderRight: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 0.5,
          pb: 0.5,
        }}
      >
        Pancracio
      </Grid>
      <Grid
        item
        sx={{
          width: "15%",
          borderRight: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 0.5,
          pb: 0.5,
        }}
      >
        10/03/2023
      </Grid>
      <Grid
        item
        sx={{
          width: "20%",
          borderRight: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 0.5,
          pb: 0.5,
        }}
      >
        Sinpe
      </Grid>
      <Grid
        item
        sx={{
          width: "15%",
          borderRight: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 0.5,
          pb: 0.5,
        }}
      >
        88888888
      </Grid>
      <Grid
        item
        sx={{
          width: "15%",
          borderRight: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 0.5,
          pb: 0.5,
        }}
      >
        San José
      </Grid>
      <Grid
        item
        sx={{
          width: "15%",
          borderRight: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 0.5,
          pb: 0.5,
        }}
      >
        Pendiente
      </Grid>
      <Grid
        item
        sx={{
          width: "15%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 0.5,
          pb: 0.5,
        }}
      >
        <Grid
          sx={{
            display: "flex",
            direction: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton sx={{ color: "secondary.main" }}>
            <EditIcon />
          </IconButton>
          <IconButton sx={{ color: "error.main" }}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
