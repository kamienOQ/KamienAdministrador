import { Grid, IconButton, TextField, Box, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Order } from "./order";

export const OrdersManagementFilters = () => {
  return (
    <Grid container
      alignItems="center"
      className="categories-container"
      direction="row"
      justifyContent="flex-end"
      alignContent="start"
      sx={{ ml: 10, mr: 2, mt: 0, p: 1, maxHeight: 'auto', borderRadius: 1.2, gap: 2 }}
    >

      <Grid container
        sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
      >
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            type="text"
            label="Buscar por nombre..."
            variant="outlined"
            sx={{ p: .5 }}
          />
        </Box>

        <IconButton
          className="addCategory-button"
        >
          <SearchIcon />
        </IconButton>
      </Grid>

      <Grid container>
        <Grid container
          sx={{ flexWrap: 'nowrap', border: 1, borderRadius: "5px 5px 0 0", fontWeight: 'bold' }}>
          <Grid item
            sx={{ width: '5%', borderRight: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            #
          </Grid>
          <Grid item
            sx={{ width: '20%', borderRight: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Nombre
              <IconButton>
                <UnfoldMoreIcon/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid item
            sx={{ width: '15%', borderRight: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Fecha
              <IconButton>
                <CalendarMonthIcon/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid item
            sx={{ width: '20%', borderRight: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Forma de pago
              <IconButton>
                <UnfoldMoreIcon/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid item
            sx={{ width: '15%', borderRight: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            Celular
          </Grid>
          <Grid item
            sx={{ width: '15%', borderRight: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            Dirección
          </Grid>
          <Grid item
            sx={{ width: '15%', borderRight: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            Estado
          </Grid>
          <Grid item
            sx={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            Acciones
          </Grid>
        </Grid>
        <Order />
        <Order />
      </Grid>
      <Grid container
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', p: 1 }}
      >
        <Grid item>
          <Typography>
            Mostrando 5 de 10 pedidos
          </Typography>
        </Grid>
        <Grid item
         
        >
          <IconButton><KeyboardDoubleArrowLeftIcon /></IconButton>
          <button className="page-button-selected">1</button>
          <button className="page-button">2</button>
          <button className="page-button">3</button>
          <IconButton><KeyboardDoubleArrowRightIcon /></IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
