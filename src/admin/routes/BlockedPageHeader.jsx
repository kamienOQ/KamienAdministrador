import DangerousIcon from '@mui/icons-material/Dangerous';
import { Box,Typography } from '@mui/material';
const BlockedPageHeader = () => {
  return (
    <Box sx = {{
        color:"darkred",
        backgroind: "black",
        height: "25vh",
        border: "1px solid gray",
        borderRadius: "12px",
        margin:"5%",
        display: "flex",
        justifyContent:"space-evenly",
        alignItems: "center"
    }}>
        <DangerousIcon sx = {{ height: "20vh",width:"20vh"}}/>
        <Typography variant='title' sx = {{ fontWeight:"bolder",marginRight:"10%", fontSize:"40px"}}>
                Usuario Deshabilitado
        </Typography>
    </Box>
  )
}
export default BlockedPageHeader