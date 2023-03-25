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

//import { useValue } from '../../context/ContextProvider';
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
  const { displayName, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };
   
  return (
    <Drawer variant="permanent" open={open} sx={{ bgcolor: "dark.main" }}>
        <DrawerHeader sx={{ bgcolor: "dark.main" }}>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft sx={{ color: "white" }}/>
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ bgcolor: "dark.main" }}/>
        <SideBarList/>
        <Divider sx={{ bgcolor: "dark.main" }}/>
        <Box sx={{ mx: 'auto', mt: 3, mb: 1 }}>
          <Tooltip title = {displayName} sx={{ bgcolor: "dark.main" }}> 
            <Avatar                     // title={currentUser?.name || ''}
            src='/src/admin/pages/Empty_pp.jpg'//   src={currentUser?.photoURL}
            {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          {open && <Typography sx={{ color: "white" }}>{displayName}</Typography>}
          {open && <Typography variant="body2" sx={{ color: "white" }}>{"SuperAdmin" || 'role'}</Typography>}
          {open && (
            <Typography variant="body2" sx={{ color: "white" }}>{email}</Typography>
          )}
          <Tooltip title="Cerrar sesión" sx={{ mt: 1 }}>
            <IconButton onClick={onLogout}>
              <Logout sx={{ color: "white" }}/>
            </IconButton>
          </Tooltip>
        </Box>
    </Drawer>
  )
}
