import { Dialog,DialogContent,DialogTitle,Button } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { UserToast } from "./UserToast";
import { useState } from "react";
import { eliminateUser } from "../../firebase/providers";
export const ConfirmationModal = ({open,setOpen,msg,userParams}) => {
    const [openToast,setToast] = useState(false)
    const [mensaje,setMensaje] = useState("")
    const handleClose = () =>{
        setOpen(false)
    }
    const deleteUser = async() =>{
        userParams.habilitado = false
        setMensaje("Usuario Eliminado Correctamente")
        eliminateUser(userParams.id,userParams)
        setToast(true)
        setOpen(false)
    }
  return (
    <>
    <Dialog
        open={open}
    >
        <DialogContent sx={{ maxHeight: 300}}>
            <DialogTitle>
                {msg}
            </DialogTitle>
        <div style={{ display: "flex", justifyContent: "space-between" ,width:"100%"}}>
            <Button 
                onClick={handleClose}
                variant="contained"
                className="cancelCategory-button"
                sx={{ backgroundColor: "error.main", color: "tertiary.main", borderRadius: 20 ,mb : 7}}
            >
                <CloseIcon/>
            </Button>
            <Button
                onClick={deleteUser}
                variant="contained"
                className="addCategory-modal-button"
                sx={{ backgroundColor: "success.main", color: "tertiary.main", borderRadius: 20 ,mb : 7}}
            >
                <CheckIcon/>
            </Button>
        </div>
        </DialogContent>
    </Dialog>
    <UserToast openSnackBar = {openToast} setOpenSnackBar = {setToast} message = {mensaje}/>
    </>
  )
}
