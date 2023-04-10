import { 
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button
   } from "@mui/material"
import { useUserState } from '../../hooks/useUserState';
import UpdateIcon from '@mui/icons-material/Update';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { UserToast } from "./UserToast";
import { updateUser } from "../../firebase/providers";
export const EditUserModal = ({open,setOpen,userParams}) => 
{
    const [username,setUsername] = useState("")
    const [numero,setNumero] = useState("")
    const [message,setMessage] = useState("")
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const { imageLoad,onUploadImage }  = useUserState();  
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleEditUser = async() =>{
        if( username !== "" && numero !== "" ){
            userParams.nombre = username
            userParams.numero = numero
            setMessage("Usuario Editado Correctamente")
            setOpenSnackBar(true)
            updateUser(userParams.id,userParams)
            setOpen(false)
        }
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
                variant="outlined"
                name="categoryName"
                onChange= {(e) => setNumero(e.target.value)}
            />
            </form>
            <div className="action-buttons">
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
                sx={{ m: 3 ,borderRadius: "10%" }}
            >
                <UpdateIcon />
            </Button>
            </div>
        </DialogContent>
       
    </Dialog>
    <UserToast openSnackBar = {openSnackBar} setOpenSnackBar = {setOpenSnackBar} message = {message}/>
</>
)
}
