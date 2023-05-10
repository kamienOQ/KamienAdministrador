import { Button,Box,Typography } from "@mui/material"
import { startLogout } from "../../store/auth";
import { useDispatch } from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const BlockedPage = () => {
  const dispatch = useDispatch();
  const LogOut = () =>{
    dispatch(startLogout())
  }
  return (
    <>
        <Box sx = {{
          border: "3px solid gray",
          borderRadius: "12px",
          margin:"5%",
          minHeight:"20%",
          display:"flex",
          height: "30vh",
          alignItems:"center"
        }}
          >
          <Typography variant = "body"sx = {{ml:"10%",fontSize:"20px"}}>
            El usuario con el que desea ingresar se encuentra inhabilitado en la base de datos,
            contacte con el administrador para poder acceder a las funciones de administrador Kamein.
          </Typography>
        </Box>
        <Box sx = {{display:"flex",alignItems:"left"}}>
          <Button onClick={LogOut} sx = {{marginLeft:"20%" }}>
           <ArrowBackIcon sx =  {{width:"7vh",height:"7vh"}} />
           <Typography variant = "body"sx = {{ml:"10%",fontSize:"20px"}}>
              Atras
           </Typography>              
          </Button>
        </Box>
    </>
  )
}

export default BlockedPage