import React from 'react'
import {
  ChevronLeft,
  Logout
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { SideBarList } from './SideBarList';
import { startLogout } from "../../store/auth";
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const SideList = ({ open, setOpen }) => {

  const [selectedLink, setSelectedLink] = useState('');
  const handleLogout = () => {

    console.log("Manejar Salir Sesión")
    // dispatch({ type: 'UPDATE_USER', payload: null });
    // navigate('/');
  };    
  return (
    <Drawer variant="permanent" open={open}>
        <DrawerHeader  sx = {{backgroundColor : "#D1B000"}}>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <SideBarList/>
        <Divider />
        <Box sx={{ mx: 'auto', mt: 3, mb: 1,backgroundColor : "#8D918D"}} >
          <Tooltip title = "Nombre de Admin"> 
            <Avatar                     // title={currentUser?.name || ''}
            {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
        </Box>
        <Box sx={{ textAlign: 'center'   }}>
          {open && <Typography>{"Nombre De usuario"}</Typography>}
          <Typography variant="body2">{"SuperAdmin" || 'role'}</Typography>
          {open && (
            <Typography variant="body2">{"Administrador123@gmail.com"}</Typography>
          )}
          <Tooltip title="Logout" sx={{ mt: 1 }}>
            <IconButton onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
    </Drawer>
  )
}