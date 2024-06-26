import { useState, useEffect } from "react";
import { Box } from "@mui/system"
import { FormControl, TextField, FormLabel, Button, IconButton, Snackbar, Alert } from "@mui/material"
import UpdateIcon from '@mui/icons-material/Update';
import { updateLoggedUser, updateUserEmail, updateUserPassword, getUserInfo } from "../../firebase/providers";
export const ProfileForm = () => {
    const [currentUserInfo, setUserInfo] = useState([])

    const [showPassword, setShowPassword] = useState(false)
    // Form useStates 
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMessage] = useState("")

    const [openToast, setOpenToast] = useState(false)
    const [toastMsg, setToastMsg] = useState("")

    const [editSuccess, setEditSuccess] = useState(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            setUserInfo(await getUserInfo())
        }
        fetchCurrentUser()
    }, [])
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleUpdateUser = async () => {
        let tempError = false;
        const updatedUser = {}
        if (number !== "") {
            updatedUser.numero = number
        }
        if (name !== "") {
            updatedUser.nombre = name
        }
        if (email !== "") {
            updatedUser.correo = email
            updateUserEmail(email)
        }
        if (password !== "") {
            if (password.length >= 6) {
                updateUserPassword(password)
            }
            else {
                setErrorMessage("La contraseña debe tener más de 6 caracteres.")
                setError(true)
                tempError = true;
            }

        }

        updateLoggedUser(updatedUser)
        setUserInfo(await getUserInfo())
        setToastMsg("Datos Actualizados Correctamente.")
        setOpenToast(true)
        if (!tempError && (number !== "" || name !== "" || email !== "" || password !== "")) {
            setEditSuccess(true);
        }
    }

    const handleCloseEditMessage = () => {
        setEditSuccess(false);
    };

    return (
        <Box
            className="profile-container"
            style={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "12px",
                border: "2px solid gray",
                minWidth: "90%",
                height: "vh"
            }}>
            <Snackbar open={editSuccess} autoHideDuration={3000} onClose={handleCloseEditMessage} sx={{ alignItems: "flex-start", mt: "42px" }}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}>
                <Alert onClose={handleCloseEditMessage} severity="success" sx={{ width: '100%' }}>
                    Se editó correctamente
                </Alert>
            </Snackbar>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 style={{ margin: "4%", color: "grey", width: "96%", fontWeight: 900 }}>
                    Información general
                </h2>
                <Button type="outlined" style={{ borderRadius: "12px", border: "1px solid", margin: "25px", color: "black" }} onClick={handleUpdateUser}>
                    <UpdateIcon />
                    <h4>
                        Actualizar Información
                    </h4>
                </Button>
            </div>
            <FormControl sx={{ width: "100%", height: "81%", borderRadius: "12px", display: "sub-grid", textAlign: "center" }}>
                <div style={{ justifyContent: "space-between", display: "flex" }}>
                    <FormLabel sx={{ marginLeft: "5%", fontWeight: 900 }}>
                        Nombre:
                    </FormLabel>
                    <FormLabel sx={{ marginRight: "5%" }}>
                        {currentUserInfo ? currentUserInfo.nombre : "Esperando..."}
                    </FormLabel>
                </div>
                <TextField
                    sx={{ margin: "1%" }}
                    placeholder={currentUserInfo ? currentUserInfo.nombre : "Esperando..."}
                    onChange={(e) => setName(e.target.value)}
                >
                </TextField>
                <div style={{ justifyContent: "space-between", display: "flex" }}>
                    <FormLabel sx={{ marginLeft: "5%", fontWeight: 900 }}>
                        Número:
                    </FormLabel>
                    <FormLabel sx={{ marginRight: "5%" }}>
                        {currentUserInfo ? currentUserInfo.numero : "Esperando..."}
                    </FormLabel>
                </div>
                <TextField
                    sx={{ margin: "1%" }}
                    placeholder={currentUserInfo ? currentUserInfo.numero : "Esperando..."}
                    onChange={(e) => setNumber(e.target.value)}
                >
                </TextField>
                <div style={{ justifyContent: "space-between", display: "flex" }}>
                    <FormLabel sx={{ marginLeft: "5%", fontWeight: 900 }}>
                        Correo Electrónico:
                    </FormLabel>
                    <FormLabel sx={{ marginRight: "5%" }}>
                        {currentUserInfo ? currentUserInfo.correo : "Esperando..."}
                    </FormLabel>
                </div>
                <TextField
                    sx={{ margin: "1%" }}
                    placeholder={currentUserInfo ? currentUserInfo.correo : "Esperando..."}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </TextField>
                <div style={{ justifyContent: "space-between", display: "flex" }}>
                    <FormLabel sx={{ marginLeft: "5%", fontWeight: 900 }}>
                        Contraseña:
                    </FormLabel>

                </div>
                <TextField
                    type="text"
                    sx={{ margin: "1%", width: "60%" }}
                    onChange={(e) => setPassword(e.target.value)}
                    error={error}
                    helperText={errorMsg}
                >

                </TextField>
            </FormControl>
        </Box>
    )
}