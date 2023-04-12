import { styled } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { Home, Menu } from "@mui/icons-material";
import { SideList } from "./SideList";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import "./Navbar.css";
const drawerWidth = 239;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <Menu sx={{ color: "dark.main" }} />
          </IconButton>
          <Tooltip title="Volver a la página de gestión de pedidos">
            <IconButton component={RouterLink} sx={{ mr: 1 }} to="/">
              <Home sx={{ color: "dark.main" }} />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Kámien
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider sx={{ bgcolor: "primary.main" }} />
      <SideList {...{ open, setOpen }} />
    </Box>
  );
};