import { Button, Grid, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useUiStore } from "../../hooks";
import { CategoryModal } from "../";


export const CategoriesPages = () => {

  const { openCategoryModal } = useUiStore();

  return (
    <Grid
      className="attributes-container"
      container
      spacing={0}
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', color: 'secondary.main' }}
    >
      <Grid
        alignItems="center"
        className="box-border secundary-attributes-container"
        container
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ m: 2, padding: 4, maxHeight: 20 }}

      >
        {/* TODO: justify-content: space-between */}
        <Grid
          alignItems="center"
          item
          justifyContent="center"
          sx={{ p: 2 }}
          xs={12}
          sm={4}
        >
          <Typography variant='h4'>Gestión de Atrubutos</Typography>
        </Grid>

        <Grid
          alignItems="center"
          item
          justifyContent="center"
          sx={{ p: 2 }}
          xs={12}
          sm={4}

        >
          <Button
            className="addAttribute-button"
            onClick={openCategoryModal}
            startIcon={<AddCircleIcon />}
            sx={{ backgroundColor: 'golden.main', minWidth: 0 }}
            variant='contained'
          >
            Añadir Atributo
          </Button>
        </Grid>
      </Grid>
      <CategoryModal/>
    </Grid>
  )
}
