
import { Grid, IconButton, TextField, Box, Typography, Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Attribute } from "./Attribute";

/*export const AttributeFilters = () => {
  return (
    <div>AttributeFilters</div>
  )
}*/

export const AttributeFilters = () => {
  return (
    <Grid container
      alignItems="center"
      className="attributes-container"
      direction="row"
      justifyContent="flex-end"
      alignContent="start"
      sx={{ ml: 2, mr: 2, mt: 0, p: 1, maxHeight: 'auto', backgroundColor: 'darkGray.main', borderRadius: 1.2, gap: 2 }}
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
            className="custom-input"
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
        </Box>

        <IconButton
          className="addAttribute-button"
          sx={{ backgroundColor: 'golden.main' }}
        >
          <SearchIcon sx={{ color: 'secondary.main' }} />
        </IconButton>
      </Grid>
      
      <Grid container>
        <Grid container
          sx={{ flexWrap: 'nowrap', border: 1, borderColor: 'secondary.main', borderRadius: 1, fontWeight: 'bold' }}>
          <Grid item sx={{ width: '5%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>#</Grid>
          <Grid item sx={{ width: '20%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>Nombre</Grid>
          <Grid item sx={{ width: '30%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>Categorias a las que pertenece</Grid>
          <Grid item sx={{ width: '15%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>Fecha</Grid>
          <Grid item sx={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>Acciones</Grid>
        </Grid>
        <Attribute />
        <Attribute />
      </Grid>
      <Grid container
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', p: 1 }}      
      >
        <Grid item>
          <Typography>
            Mostrando 5 de 10 Atributos
          </Typography>
        </Grid>
        <Grid item 
          sx={{ color: 'secondary.main' }}
        >
          <IconButton sx={{ color: 'secondary.main' }}><KeyboardDoubleArrowLeftIcon/></IconButton>
          <button className="page-button-selected">1</button>
          <button className="page-button">2</button>
          <button className="page-button">3</button>
          <IconButton sx={{ color: 'secondary.main' }}><KeyboardDoubleArrowRightIcon/></IconButton>
        </Grid>
      </Grid>


    </Grid>
  )
}