import { useState,useEffect } from "react";
import { Box } from "@mui/system"
import { FormControl,TextField,FormLabel,Button  } from "@mui/material"
import UpdateIcon from '@mui/icons-material/Update';
import { updateLoggedUser,updateUserEmail,updateUserPassword,getUserInfo } from "../../firebase/providers";
export const ProfileForm = () => {
    const [currentUserInfo, setUserInfo] = useState([])
    // Form useStates 
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [number,setNumber] = useState("")
    const [password,setPassword] = useState("")
    useEffect(() => {
        const fetchCurrentUser = async() =>{
            setUserInfo(await getUserInfo())  
        } 
        fetchCurrentUser()
    },[])
    const handleUpdateUser = async() =>{
        const updatedUser = {}
        if (email !== ""){
            updatedUser.correo = email
            updateUserEmail(email)
        }
        if (number !== ""){
            updatedUser.numero = number
        }
        if (name !== ""){
            updatedUser.nombre = name
        }
        if (password !== ""){
            updateUserPassword(password)
        }
        updateLoggedUser(updatedUser)
        setUserInfo(await getUserInfo())
    }
  return (
    <Box
    style = {{
        backgroundColor: "white",
        color:"black",
        marginLeft: "5%",
        borderRadius: "12px",
        border: "2px solid gray",
        minWidth: "90%",
        height: "vh"
    }}>
    <div style={{display:"flex",justifyContent:"space-between"}}>
        <h2 style={{margin:"4%",color:"grey",width:"96%",fontWeight:900}}>
            Información general
        </h2>
        <Button type="outlined" style={{borderRadius:"12px",border: "1px solid",margin:"25px"}} onClick= {handleUpdateUser}>
            <UpdateIcon />
            <h4>
                Actualizar Información
            </h4>
        </Button>   
    </div>    
    <FormControl sx= {{width:"100%",height:"81%",borderRadius:"12px",display:"sub-grid",textAlign:"center"}}>
        <div style={{justifyContent:"space-between",display:"flex"}}>
            <FormLabel sx={{marginLeft:"5%",fontWeight:900}}>
                Nombre:
            </FormLabel>
            <FormLabel sx={{marginRight:"5%"}}>
                {currentUserInfo ? currentUserInfo.nombre : "Esperando..."} 
            </FormLabel>
        </div>
        <TextField
         sx={{margin:"1%"}} 
         placeholder= {currentUserInfo ? currentUserInfo.nombre : "Esperando..."} 
         onChange = {(e) => setName(e.target.value)}
         >
        </TextField>
        <div style={{justifyContent:"space-between",display:"flex"}}>
            <FormLabel sx={{marginLeft:"5%",fontWeight:900}}>
                Número:
            </FormLabel>
            <FormLabel sx={{marginRight:"5%"}}>
                {currentUserInfo ? currentUserInfo.numero : "Esperando..."} 
            </FormLabel>
        </div>
        <TextField 
        sx={{margin:"1%"}} 
        placeholder= {currentUserInfo ? currentUserInfo.numero : "Esperando..."}
        onChange = {(e) => setNumber(e.target.value)}
        >
        </TextField>
        <div style={{justifyContent:"space-between",display:"flex"}}>
            <FormLabel sx={{marginLeft:"5%",fontWeight:900}}>
                Correo Electrónico:
            </FormLabel>
            <FormLabel sx={{marginRight:"5%"}}>
                {currentUserInfo ? currentUserInfo.correo : "Esperando..." } 
            </FormLabel>
        </div>
        <TextField 
        sx={{margin:"1%"}} 
        placeholder= {currentUserInfo ? currentUserInfo.correo : "Esperando..."}
        onChange= {(e) => setEmail(e.target.value)}
        >
        </TextField>
        <div style={{justifyContent:"space-between",display:"flex"}}>
            <FormLabel sx={{marginLeft:"5%",fontWeight:900}}>
                Contraseña:
            </FormLabel>
            <FormLabel sx={{marginRight:"5%"}}>
                *****************
            </FormLabel>
        </div>  
        <TextField sx={{margin: "1%"}} 
        onChange={(e) => setPassword(e.target.value)}
        > 
        </TextField>
    </FormControl>
    </Box>
  )
}