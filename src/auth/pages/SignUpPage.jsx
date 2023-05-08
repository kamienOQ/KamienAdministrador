import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, IconButton, InputAdornment, Link, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { logout, startCreatingUserWithEmailPassword } from "../../store/auth";

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
    password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
    displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
}

export const SignUpPage = () => {

    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector((state) => state.auth);
  
    const [showPassword, setShowPassword] = useState(false);
  
    const { 
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid, 
    } = useForm( formData, formValidations );
  
    const isAuthenticating = useMemo(() => status === "checking", [status]);
  
    const onSubmit = async (event) => {
      event.preventDefault();
      setFormSubmitted(true);
  
      if (displayName.trim() === "") {
        dispatch(logout({ errorMessage: "El nombre de usuario es obligatorio"}));
      } else if (email.trim() === "") {
        dispatch(logout({ errorMessage: "El correo es obligatorio"}));
      }
        else if (password.trim() === "") {
        dispatch(logout({ errorMessage: "La contraseña es obligatoria"}));
      } else {
        dispatch(startCreatingUserWithEmailPassword(email, password, displayName));
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
              <label htmlFor="displayName">Nombre completo</label>
              <TextField
                hiddenLabel
                id="displayName"
                fullWidth
                variant="outlined"
                placeholder='Nombre completo' 
                sx={{ mt: 1 }}
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={ !!displayNameValid && formSubmitted }
                helperText={ displayNameValid }
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
                placeholder='correo@gmail.com' 
                name="email"  
                value={email}
                onChange={onInputChange}
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
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
                error={ !!passwordValid && formSubmitted  }
                helperText={ passwordValid }
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
              Crear cuenta
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
