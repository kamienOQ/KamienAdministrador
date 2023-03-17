import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { logout, startResetPassword } from "../../store/auth";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const { errorMessage, success } = useSelector((state) => state.auth);

  const { password, onInputChange } = useForm({
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const oobCode = queryParams.get("oobCode");

  if (!oobCode) {
    navigate(-1);
  }

  if (success) {
    return <Navigate to="/auth/login" />;
  }

  const onClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 8) {
      dispatch(logout({ errorMessage: "La contraseña debe ser mayor o igual a 8 caracteres"}));
    } else {
      dispatch(startResetPassword(oobCode, password));
    }
  };

  return (
    <AuthLayout title="Restablece tu contraseña">
      <form onSubmit={ onSubmit }>
        <Grid container>
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
            fullWidth
            color="primary"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "16px"
            }}
          >
            Guardar
          </Button>
        </Grid>
      </form>
    </AuthLayout>
  )
}
