import { 
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Switch
   } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { UserToast } from "./UserToast";
import { updateUser } from "../../firebase/providers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onChangeEditSuccess } from "../../store/users/usersSlice";
const containsOnlyNumbers = (str) => {
    return /^\d+$/.test(str);
  }
export const EditUserModal = ({setUser,open,setOpen,userParams}) => 
{
    const dispatch = useDispatch();

    const [username,setUsername] = useState("")
    const [numero,setNumero] = useState("")
    // const [message,setMessage] = useState("")
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [userState,setUserState] = useState(userParams.habilitado)
    const [error,setError] = useState(false)
    const [errorMsg,setErrorMessage] = useState("")
    const handleClose = () => {
        setOpen(false);
    };
    const SwitchChange = () =>{
        userParams.habilitado = !userParams.habilitado 
        setUserState(userParams.habilitado)
    }
    const handleEditUser = async() =>{
        if( username !== "" && numero !== ""){
            if ((!containsOnlyNumbers(numero) && numero.length >= 8) && numero !== "No definido"){
                setError(true)
                setErrorMessage("El número ingresado es inválido")
            }else{
                userParams.nombre = username
                userParams.numero = numero
                userParams.habilitado = userState
                // setMessage("Usuario Editado Correctamente")
                setOpenSnackBar(true)
                updateUser(userParams.id,userParams)
                setOpen(false)
                setError(false)
                setErrorMessage("")
                // setUser(params)
                dispatch(onChangeEditSuccess(true));
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
                placeholder = "88888888"
                variant="outlined"
                name="categoryName"
                onChange= {(e) => handleNumber(e)}
                helperText= {errorMsg}
                error= {error}
                inputProps={{
                    maxLength: 14,
                  }}
            />
            <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
            <p>
                Usuario Habilitado: 
            </p>
            <Switch
                checked= {userState}
                onChange={SwitchChange}
            >          
            </Switch>
            </div>
            </form>
            <div className="action-buttons" style={{minWidth:"100%"}}>
            <Button
                className="cancelCategory-button"
                sx={{ backgroundColor: "error.main", color: "tertiary.main", borderRadius: 20 ,mb : 7}}
                onClick={handleClose}
                variant="contained"
                
            >
                <CloseIcon/>
            </Button>
            <Button

                onClick={handleEditUser}
                variant="contained"
                className="addCategory-modal-button"
                sx={{ backgroundColor: "success.main", color: "tertiary.main", borderRadius: 20 ,mb : 7}}
            >
                <CheckIcon />
            </Button>
            </div>
        </DialogContent> 
    </Dialog>
    {/* <UserToast openSnackBar = {openSnackBar} setOpenSnackBar = {setOpenSnackBar} message = {message}/> */}
</>
)
}
