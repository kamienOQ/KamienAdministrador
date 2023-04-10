import { Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMemo } from "react";

export const Order = ({id, name, date, wayToPay, cellphone, address, status}) => {
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    const formatDate = new Intl.DateTimeFormat("es-ES").format(newDate);
    return formatDate;
  }, [date]);
  return (
    <Grid
      container
      className="column-container"
      sx={{
        flexWrap: "nowrap",
        bl: 1,
        border: 1,
        borderTop: 0
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
        {id}
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
        {name}
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
        {dateString}
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
        {wayToPay}
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
        {cellphone}
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
        {address}
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
        {status}
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
          <IconButton>
            <EditIcon sx={{ color: "primary.main" }}/>
          </IconButton>
          <IconButton>
            <DeleteIcon sx={{ color: "error.main" }}/>
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
