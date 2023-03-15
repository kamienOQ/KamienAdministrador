import { Grid, IconButton, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const Category = ({ id, category }) => {

  const date = new Date(category.date);

  return (
    <Grid container sx={{ flexWrap: 'nowrap', bl: 1, border: 1, borderTop: 0, borderColor: 'secondary.main' }}>
      <Grid item
        sx={{
          width: '5%', borderRight: 1, borderColor: 'secondary.main',
          display: 'flex', justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5
        }}
      >
        {id}
      </Grid>
      <Grid item
        sx={{ width: '20%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', 
              justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}
      >
        {category.categoryName}
      </Grid>
      <Grid item
        sx={{ width: '15%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', 
              justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}
      >
        {
          
          `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        }
      </Grid>
      <Grid item
        sx={{ width: '15%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', 
              justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}
      >
        <img className="table-img" src={category.image.url} alt={category.image.name} />
      </Grid>
      <Grid item
        sx={{ width: '15%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', 
              justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}
      >
        <img className="table-icon" src={category.icon.url} alt={category.icon.name} />
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