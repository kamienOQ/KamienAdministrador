import { 
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button
   } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { UserToast } from "./UserToast";
import { updateUser } from "../../firebase/providers";
import { useEffect } from "react";
const containsOnlyNumbers = (str) => {
    return /^\d+$/.test(str);
  }
export const EditUserModal = ({open,setOpen,userParams}) => 
{
    const [username,setUsername] = useState("")
    const [numero,setNumero] = useState("")
    const [message,setMessage] = useState("")
    const [openSnackBar,setOpenSnackBar] = useState(false)

    const [error,setError] = useState(false)
    const [errorMsg,setErrorMessage] = useState("")
    const handleClose = () => {
        setOpen(false);
    };
    const handleEditUser = async() =>{
        if( username !== "" && numero !== "" ){
            if (!containsOnlyNumbers(numero) && numero.length >= 8){
                setError(true)
                setErrorMessage("El número ingresado es inválido")
            }else{
                userParams.nombre = username
                userParams.numero = numero
                setMessage("Usuario Editado Correctamente")
                setOpenSnackBar(true)
                updateUser(userParams.id,userParams)
                setOpen(false)
                setError(false)
                setErrorMessage("")
            }
        }
    }
    useEffect(() => {
      setUsername(userParams.nombre)
      setNumero(userParams.numero)
    }, [])
    
    const handleNumber = (e) =>{
        setNumero(e.target.value)
    }
return (
<>
    <Dialog
        className="modal-container-categories"
        open={open}
    >
        <DialogContent sx={{ maxHeight: 625}}>
        <div style = {{justifyContent: "space-evenly",display:"flex",color:"white",background:"black",borderRadius:"10px"}}>
            <DialogTitle>
                Editar Usuario:
            </DialogTitle>
        </div>
            <form className="category-form">
            <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                <p style={{color: "black"}}>
                    Nombre de Usuario:
                </p>
                <p style = {{color:"grey"}}>
                    {userParams.nombre}
                </p>
            </div>
            <TextField
                type="text"
                fullWidth
                variant="outlined"
                name="categoryName"
                onChange={(e) => setUsername(e.target.value)}
                placeholder={username}
                inputProps={{
                    maxLength: 60
                }}
            />

            <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                <p style={{color: "black"}}>
                    Número de teléfono:
                </p>
                <p style = {{color:"grey"}}>
                    {userParams.numero}
                </p>
            </div>
            <TextField
                type="text"
                fullWidth
                placeholder = "8888-8888"
                variant="outlined"
                name="categoryName"
                onChange= {(e) => handleNumber(e)}
                helperText= {errorMsg}
                error= {error}
                inputProps={{
                    maxLength: 14,
                  }}
            />
            </form>
            <div className="action-buttons" style={{minWidth:"100%"}}>
            <Button
                className="cancelProduct-button"
                onClick={handleClose}
                variant="contained"
                sx={{ 
                    backgroundColor: "red" ,
                    m: 3,
                    borderRadius: "10%"
                }}
            >
                <CloseIcon/>
            </Button>
            <Button
                className="addProduct-button"
                onClick={handleEditUser}
                variant="contained"
                sx={{ m: 3 ,borderRadius: "10%" ,backgroundColor:"green"}}
            >
                <CheckIcon />
            </Button>
            </div>
        </DialogContent> 
    </Dialog>
    <UserToast openSnackBar = {openSnackBar} setOpenSnackBar = {setOpenSnackBar} message = {message}/>
</>
)
}
