import { Grid, IconButton, TextField, Box, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Product, PageButtons } from './';
import { useProductsStore, useLoadDataPage, useUiStore } from '../../hooks';
import { useEffect, useState } from 'react';

export const ProductFilters = () => {

  const { ascending, numberProducts, productsOnPage, changeAscending } = useProductsStore();
  const { isProductModalOpen, restorePage, page, upPage, downPage } = useUiStore();
  const { loadData } = useLoadDataPage();

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if(inputValue === ''){
      restorePage();
      changeAscending(inputValue);
      loadData();
    }
  }, [inputValue]);

  useEffect(() => {
    loadData();
  }, [isProductModalOpen])
  

  const onInputChange = ( {target} ) => {
      setInputValue( target.value );
  }

  const onHadleUp = () => {
    upPage()
  }

  const onHadleDown = () => {
    downPage()
  }

  const onSearchName = () => {
    restorePage();
    changeAscending(inputValue);
  }

  const onAscendingFilter = () => {
    if(ascending === '' || ascending === 'descending' || ascending === 'dateAscending'){
      changeAscending('ascending');
    }else{
      changeAscending('descending');
    }
  }

  const onDate = () => {
    if(ascending === ''){
      changeAscending('dateAscending');
    }else{
      changeAscending('');
    }
  }

  return (
    <Grid container
      alignItems="center"
      className="products-container"
      direction="row"
      justifyContent="flex-end"
      alignContent="start"
      sx={{ ml: 2, mr: 2, mt: 0, p: 1, maxHeight: 'auto', backgroundColor: 'darkGray.main', 
        borderRadius: 1.2, gap: 2 
      }}
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
            name="search"
            value={ inputValue }
            onChange={ onInputChange }
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
        </Box>

        <IconButton
          className="addProduct-button"
          onClick={onSearchName}
          sx={{ backgroundColor: 'golden.main' }}
        >
          <SearchIcon sx={{ color: 'secondary.main' }} />
        </IconButton>

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
            label="Buscar por fecha..."
            variant="outlined"
            className="custom-input"
            name="search"
            value={ inputValue }
            onChange={ onInputChange }
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
        </Box>

        <IconButton
          className="addProduct-button"
          onClick={onSearchName}
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
            sx={{ width: '15%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Nombre
              <IconButton sx={{ color: 'secondary.main' }} onClick={onAscendingFilter}>
                <UnfoldMoreIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item
            sx={{ width: '10%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Fecha
              <IconButton sx={{ color: 'secondary.main' }} onClick={onDate}>
                <CalendarMonthIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item
            sx={{ width: '25%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            Imagen
          </Grid>
          <Grid item
            sx={{ width: '25%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            Icono
          </Grid>
          <Grid item
            sx={{ width: '10%', borderColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}>
            Acciones
          </Grid>
        </Grid>
        {
          productsOnPage.map((product, index) => (
            index === 0 ?
              <Product key={(page * 5)-4} id={(page * 5)-4} product={product} />
            :
            index === 1 ?
              <Product key={(page * 5)-3} id={(page * 5)-3} product={product} />
            :
            index === 2 ?
              <Product key={(page * 5)-2} id={(page * 5)-2} product={product} />
            :
            index === 3 ?
              <Product key={(page * 5)-1} id={(page * 5)-1} product={product} />
            :
              <Product key={page * 5} id={page * 5} product={product} />
          ))
        }
      </Grid>
      <Grid container
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', p: 1 }}
      >
        <Grid item>
          <Typography>
            {`Mostrando ${productsOnPage.length} de ${numberProducts} products`}
          </Typography>
        </Grid>
        <Grid item
          sx={{ color: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <IconButton sx={{ color: 'secondary.main' }} onClick={onHadleDown}><KeyboardDoubleArrowLeftIcon /></IconButton>
          <PageButtons />
          <IconButton sx={{ color: 'secondary.main' }} onClick={onHadleUp}><KeyboardDoubleArrowRightIcon /></IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

