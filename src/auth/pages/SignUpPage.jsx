import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, IconButton, InputAdornment, Link, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { logout, startSignUp } from "../../store/auth";

export const SignUpPage = () => {
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector((state) => state.auth);
  
    const [showPassword, setShowPassword] = useState(false);
  
    const { nameUser, email, password, onInputChange } = useForm({
        nameUser: "",
        email: "",
        password: "",
    });
  
    const isAuthenticating = useMemo(() => status === "checking", [status]);
  
    const onSubmit = async (event) => {
      event.preventDefault();
  
      if (nameUser.trim() === "") {
        dispatch(logout({ errorMessage: "El nombre de usuario es obligatorio"}));
      } else if (email.trim() === "") {
        dispatch(logout({ errorMessage: "El correo es obligatorio"}));
      }
        else if (password.trim() === "") {
        dispatch(logout({ errorMessage: "La contraseña es obligatoria"}));
      } else {
        dispatch(startSignUp(nameUser, email, password));
      }
    };
  
    const onClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <AuthLayout title="Registrarte">
        <form onSubmit={ onSubmit }>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <label htmlFor="nameUser">Nombre de Usuario</label>
              <TextField
                hiddenLabel
                id="nameUser"
                fullWidth
                variant="outlined"
                sx={{ mt: 1 }}
                name="nameUser"
                value={nameUser}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <label htmlFor="email">Email</label>
              <TextField
                hiddenLabel
                id="email"
                fullWidth
                variant="outlined"
                sx={{ mt: 1 }}
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <label htmlFor="password">Contraseña</label>
              <TextField
                hiddenLabel
                id="password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={onClickShowPassword} sx={{ p: .5 }}>
                        {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                sx={{ mt: 1, mb: 2 }}
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </Grid>
            <Grid 
              container
              display={ !!errorMessage ? '': 'none' }
              sx={{ mb: 2 }}>
              <Grid 
                  item 
                  xs={ 12 }
                >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              disabled={ isAuthenticating }
              fullWidth
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "16px"
              }}
            >
              Registrarse
            </Button>
          </Grid>
        </form>
        <Link
          color="dark.main"
          component={RouterLink}
          sx={{ mt: 2, "&:hover": { textDecoration: "underline" } }}
          display="block"
          textAlign="center"
          underline="none"
          to="/auth/login"
        >
          Iniciar Sesión
        </Link>
      </AuthLayout>
    );
}
