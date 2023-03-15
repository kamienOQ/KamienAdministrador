import { Grid, IconButton, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const Product = ({ id, product }) => {

  const date = new Date(product.date);

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
        {product.productName}
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
        sx={{ width: '30%', borderRight: 1, borderColor: 'secondary.main', 
        display: 'flex', flexDirection: 'column', justifyContent: 'center', 
        alignItems: 'center', pt: .5, pb: .5 }}
      >
        {product.products.map((product, index, array) => {
          if(index === array.length - 1) {
            return <Typography key={index}>{product}</Typography>
          }else{
            return <Typography style={{ whiteSpace: "pre-wrap" }} key={index}>{`${product}, `}</Typography>
          }
        })}
      </Grid>
      <Grid item
        sx={{ width: '15%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', 
              justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}
      >
        <img className="table-img" src={product.image.url} alt={product.image.name} />
      </Grid>
      <Grid item
        sx={{ width: '15%', borderRight: 1, borderColor: 'secondary.main', display: 'flex', 
              justifyContent: 'center', alignItems: 'center', pt: .5, pb: .5 }}
      >
        <img className="table-icon" src={product.icon.url} alt={product.icon.name} />
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

