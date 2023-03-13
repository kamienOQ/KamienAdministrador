
import { Grid, IconButton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const Attribute = () => {
  return (
    <Grid container sx={{ flexWrap: 'nowrap', bl: 1, border: 1, borderTop: 0, borderColor: 'secondary.main' }}>
      <Grid item
        sx={{
          width: '5%', borderRight: 1, borderColor: 'secondary.main',
          display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5
        }}
      >
        1
      </Grid>
      <Grid item
        sx={{ width: '20%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', 
              justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}
      >
        Color
      </Grid>
      <Grid item
        sx={{ width: '30%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', 
              justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}
      >
        Reloj 1, Reloj 2
      </Grid>
      <Grid item
        sx={{ width: '15%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', 
              justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}
      >
        10/03/2023
      </Grid>
      <Grid item
        sx={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}
      >
        <Grid sx={{ display: 'flex', direction: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton sx={{ color: "secondary.main" }}>
            <EditIcon />
          </IconButton>
          <IconButton sx={{ color: "error.main" }}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}