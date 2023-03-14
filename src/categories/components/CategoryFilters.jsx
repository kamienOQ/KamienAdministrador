import { Grid, IconButton, TextField, Box, Typography, Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Category } from "./Category";
import { useCategoriesStore } from "../../hooks";

export const CategoryFilters = () => {

  const { numberCategories, categories } = useCategoriesStore();

  return (
    <Grid container
      alignItems="center"
      className="categories-container"
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
          className="addCategory-button"
          sx={{ backgroundColor: 'golden.main' }}
        >
          <SearchIcon sx={{ color: 'secondary.main' }} />
        </IconButton>
      </Grid>

      <Grid container>
        <Grid container
          sx={{ flexWrap: 'nowrap', border: 1, borderColor: 'secondary.main', borderRadius: 1, fontWeight: 'bold' }}>
          <Grid item
            sx={{ width: '5%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            #
          </Grid>
          <Grid item
            sx={{ width: '20%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Nombre
              <IconButton sx={{ color: 'secondary.main' }}>
                <UnfoldMoreIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item
            sx={{ width: '15%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Fecha
              <IconButton sx={{ color: 'secondary.main' }}>
                <CalendarMonthIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item
            sx={{ width: '30%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            Productos relacionados
          </Grid>
          <Grid item
            sx={{ width: '15%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            Imagen
          </Grid>
          <Grid item
            sx={{ width: '15%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            Icono
          </Grid>
          <Grid item
            sx={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            Acciones
          </Grid>
        </Grid>
        {
          categories.map((category, index) => (
            <Category key={category.categoryName} id={index+1} category={category}/>
          ))
        }
      </Grid>
      <Grid container
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', p: 1 }}
      >
        <Grid item>
          <Typography>
            {`Mostrando ${categories.length} de ${numberCategories} categorias`}
          </Typography>
        </Grid>
        <Grid item
          sx={{ color: 'secondary.main' }}
        >
          <IconButton sx={{ color: 'secondary.main' }}><KeyboardDoubleArrowLeftIcon /></IconButton>
          <button className="page-button-selected">1</button>
          <button className="page-button">2</button>
          <button className="page-button">3</button>
          <IconButton sx={{ color: 'secondary.main' }}><KeyboardDoubleArrowRightIcon /></IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
