import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField } from "@mui/material";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { logout, startLoginWithEmailPassword } from "../../store/auth";

export const AccountRecovery = () => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.auth);

  const { email, onInputChange } = useForm({
    email: "kamienoriginalquality@gmail.com",
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    if (email.trim() === "") {
      dispatch(logout({ errorMessage: "El correo es obligatorio"}));
    } else {
      console.log("Recuperando cuenta");
    }
  };

  return (
    <AuthLayout title="Recuperar cuenta">
      <form onSubmit={ onSubmit }>
        <Grid container>
          <Grid item xs={12} sx={{ my: 2 }}>
            <label htmlFor="email">Email</label>
            <TextField
              hiddenLabel
              id="email"
              fullWidth
              variant="outlined"
              sx={{ bgcolor: "#f0f0f0", mt: 1 }}
              name="email"
              value={email}
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
            color="secondary"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "16px",
              color: "#ffffff",
              "&:hover": {
                bgcolor: "#ffe34f",
              },
            }}
          >
            Enviar
          </Button>
        </Grid>
      </form>
      <Link
        component={RouterLink}
        color="#333333"
        sx={{ mt: 2, "&:hover": { textDecoration: "underline" } }}
        display="block"
        textAlign="center"
        underline="none"
        to="/auth/login"
      >
        Iniciar sesión
      </Link>
    </AuthLayout>
  )
}
