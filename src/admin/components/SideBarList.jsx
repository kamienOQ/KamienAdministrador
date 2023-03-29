import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import InfoIcon from '@mui/icons-material/Info';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link as RouterLink } from "react-router-dom";

export const SideBarList = () => {
  return (
    <List sx={{ bgcolor: "dark.main" }}>
      <Link component={RouterLink} to = "/Categorias" sx={{textDecoration: "none", color: "white"}}>
        <ListItem key= "Añadir Usuario Administrador" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title = "Añadir Categoría" sx={{ bgcolor: "dark.main" }}> 
                    <CategoryIcon sx={{ color: "white" }}/>
                  </Tooltip>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Categoría"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Link>


        <Link component={RouterLink} to = "/Producto" sx={{textDecoration: "none", color: "white"}}>
        <ListItem key= "Añadir Usuario Administrador" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title = "Añadir Producto" sx={{ bgcolor: "dark.main" }}> 
                    <InventoryIcon sx={{ color: "white" }}/>
                  </Tooltip>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Producto"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Link>


        <Link component={RouterLink} to = "/Administradores" sx={{textDecoration: "none", color: "white"}}>
        <ListItem key= "Añadir Usuario Administrador" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title = "Añadir Administrador" sx={{ bgcolor: "dark.main" }}> 
                    <GroupAddIcon sx={{ color: "white" }}/>
                  </Tooltip>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Administrador"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Link>
                  

        <Link component={RouterLink} to = "/About" sx={{textDecoration: "none", color: "white"}}>
        <ListItem key= "Añadir Usuario Administrador" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title = "Añadir Acerca De" sx={{ bgcolor: "dark.main" }}> 
                    <InfoIcon sx={{ color: "white" }}/>
                  </Tooltip>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Acerca De"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Link>

        <Link component={RouterLink} to = "/Perfil" sx={{textDecoration: "none", color: "white"}}>
        <ListItem key= "Añadir Usuario Administrador" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title = "Configurar Cuenta" sx={{ bgcolor: "dark.main" }}> 
                    <ManageAccountsIcon sx={{ color: "white" }}/>
                  </Tooltip>
                </ListItemIcon>
                <ListItemText
                  primary={"Configurar Cuenta"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton> 
        </ListItem>
        </Link>
    </List>
  )
}