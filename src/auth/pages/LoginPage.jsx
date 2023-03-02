import { Button, Grid, Link, TextField } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout title="Iniciar Sesión">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <label htmlFor="username">Nombre de Usuario</label>
            <TextField
              hiddenLabel
              id="username"
              name="username"
              fullWidth
              variant="outlined"
              required
              sx={{ bgcolor: "#f0f0f0", mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <label htmlFor="password">Contraseña</label>
            <TextField
              hiddenLabel
              id="password"
              name="password"
              type="password"
              fullWidth
              required
              className="login_input"
              sx={{ bgcolor: "#f0f0f0", mt: 1, mb: 2 }}
            />
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
                bgcolor: "#ffe34f"
              }
            }}
          >
            Iniciar Sesión
          </Button>
        </Grid>
      </form>
      <Link href="#" color="#333333" sx={{ mt: 2, '&:hover': { textDecoration: 'underline' } }} display="block" textAlign="center" underline="none">
        ¿Olvidaste tu contraseña?
      </Link>
    </AuthLayout>
  );
};
