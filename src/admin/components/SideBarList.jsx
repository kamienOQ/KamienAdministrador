import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import Tooltip from '@mui/material/Tooltip';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import { Link as RouterLink } from "react-router-dom";

export const SideBarList = () => {
  return (
    <List sx={{ bgcolor: "primary.main" }}>
        <Link color="dark.main" component={RouterLink} to = "/Administradores" sx={{textDecoration: "none"}}>
        <Tooltip title="Añadir Administrador">  
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
                  <GroupAddIcon sx={{ color: "dark.main" }}/>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Administrador"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Tooltip>
        </Link>


        <Link color="dark.main" component={RouterLink} to = "/Producto" sx={{textDecoration: "none"}}>
        <Tooltip title="Añadir Producto">  
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
                  <AddIcon sx={{ color: "dark.main" }}/>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Producto"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Tooltip>
        </Link>
        
        
        <Link color="dark.main" component={RouterLink} to = "/Categorias" sx={{textDecoration: "none"}}>
        <Tooltip title="Añadir Categoría"> 
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
                  <CategoryIcon sx={{ color: "dark.main" }}/>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Categoría"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Tooltip>
        </Link>
                  

        <Link color="dark.main" component={RouterLink} to = "/About" sx={{textDecoration: "none"}}>
        <Tooltip title="Añadir Acerca De">
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
                  <InfoIcon sx={{ color: "dark.main" }}/>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Acerca De"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Tooltip>
        </Link>

        <Link color="dark.main" component={RouterLink} to = "/Attributes" sx={{textDecoration: "none"}}>
        <Tooltip title="Añadir Atributos">
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
                  <EditAttributesIcon sx={{ color: "dark.main" }}/>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Atributos"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Tooltip>
        </Link>

        <Link color="dark.main" component={RouterLink} to = "/Perfil" sx={{textDecoration: "none"}}>
        <Tooltip title="Añadir Usuario">
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
                  <ManageAccountsIcon sx={{ color: "dark.main" }}/>
                </ListItemIcon>
                <ListItemText
                  primary={"Configurar Cuenta"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton> 
        </ListItem>
        </Tooltip>
        </Link>
    </List>
  )
}
