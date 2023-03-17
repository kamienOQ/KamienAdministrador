import { useSelector } from "react-redux";
import { Grid, IconButton, TextField, Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Order } from "./order";
import { useFilters } from "../../hooks/useFilters";
import { useState } from "react";

export const OrdersManagementFilters = () => {
  const { orders } = useSelector((state) => state.orders);

  const [status, setStatus] = useState('');

  const {
    isUpNameActive,
    isDownNameActive,
    isUpPayActive,
    isDownPayActive,
    onUpNameClick,
    onDownNameClick,
    onUpPayClick,
    onDownPayClick,
  } = useFilters();

  const onChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Grid
      container
      alignItems="center"
      className="categories-container"
      direction="row"
      justifyContent="flex-end"
      alignContent="start"
      sx={{
        ml: 10,
        mr: 2,
        mt: 0,
        p: 1,
        maxHeight: "auto",
        borderRadius: 1.2,
        gap: 2
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <FormControl sx={{ width: "150px" }}>
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Estado"
            onChange={onChangeStatus}
          >
            <MenuItem value="pendiente">Pendiente</MenuItem>
            <MenuItem value="en envio">En envío</MenuItem>
            <MenuItem value="entregado">Entregado</MenuItem>
            <MenuItem value="cancelado">Cancelado</MenuItem>
          </Select>
        </FormControl>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            type="text"
            label="Buscar por nombre..."
            variant="outlined"
          />
        </Box>

        <IconButton className="addCategory-button">
          <SearchIcon sx={{ color: "dark.main" }}/>
        </IconButton>
      </Grid>

      <Grid container className="table-container">
        <Grid
          container
          sx={{
            flexWrap: "nowrap",
            border: 1,
            borderColor: "dark.main",
            borderRadius: "5px 5px 0 0",
            fontWeight: "bold",
            bgcolor: "info.main",
            color: "white"
          }}
        >
          <Grid
            item
            sx={{
              width: "5%",
              borderRight: 1,
              borderColor: "dark.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: 0.5,
              pb: 0.5,
            }}
          >
            #
          </Grid>
          <Grid
            item
            sx={{
              width: "20%",
              borderRight: 1,
              borderColor: "dark.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: 0.5,
              pb: 0.5,
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Nombre
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <IconButton hover="true" sx={{ p: 0 }} onClick={onUpNameClick}>
                  <KeyboardArrowUpIcon
                    sx={{ color: isUpNameActive ? "primary.main" : "white" }}
                  />
                </IconButton>
                <IconButton
                  hover="true"
                  sx={{ p: 0 }}
                  onClick={onDownNameClick}
                >
                  <KeyboardArrowDownIcon
                    sx={{ color: isDownNameActive ? "primary.main" : "white" }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              width: "15%",
              borderRight: 1,
              borderColor: "dark.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: 0.5,
              pb: 0.5,
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Fecha
              <IconButton>
                <CalendarMonthIcon sx={{ color: "white" }}/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              width: "20%",
              borderRight: 1,
              borderColor: "dark.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: 0.5,
              pb: 0.5,
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Forma de pago
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <IconButton hover="true" sx={{ p: 0 }} onClick={onUpPayClick}>
                  <KeyboardArrowUpIcon
                    sx={{ color: isUpPayActive ? "primary.main" : "white" }}
                  />
                </IconButton>
                <IconButton sx={{ p: 0 }} onClick={onDownPayClick}>
                  <KeyboardArrowDownIcon
                    sx={{ color: isDownPayActive ? "primary.main" : "white" }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              width: "15%",
              borderRight: 1,
              borderColor: "dark.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: 0.5,
              pb: 0.5,
            }}
          >
            Celular
          </Grid>
          <Grid
            item
            sx={{
              width: "15%",
              borderRight: 1,
              borderColor: "dark.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: 0.5,
              pb: 0.5,
            }}
          >
            Dirección
          </Grid>
          <Grid
            item
            sx={{
              width: "15%",
              borderRight: 1,
              borderColor: "dark.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: 0.5,
              pb: 0.5,
            }}
          >
            Estado
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
            Acciones
          </Grid>
        </Grid>
        {orders.map((order, index) => (
          <Order key={index} id={index+1} {...order} />
        ))}
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          p: 1,
        }}
      >
        <Grid item>
          <Typography>Mostrando 5 de 10 pedidos</Typography>
        </Grid>
        <Grid item>
          <IconButton>
            <KeyboardDoubleArrowLeftIcon sx={{ color: "dark.main" }} />
          </IconButton>
          <button className="page-button-selected">1</button>
          <button className="page-button">2</button>
          <button className="page-button">3</button>
          <IconButton>
            <KeyboardDoubleArrowRightIcon sx={{ color: "dark.main" }} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
