import { Grid, Typography } from "@mui/material";

export const AuthLayout = ({ children, title = "" }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{ width: { sm: 360 }, padding: 5, borderRadius: 2 }}
      >
        <Typography variant="h1" fontSize="32px" textAlign="center" sx={{ mb: 1 }}>
          { title }
        </Typography>
        { children }
      </Grid>
    </Grid>
  );
};
