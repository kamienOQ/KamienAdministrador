import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link as RouterLink } from "react-router-dom";

export const SideBarList = () => {
  return (
    <List>
        <Link color="#777777" component={RouterLink} to = "/Administradores" sx={{textDecoration: "none"}}>
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
                  <GroupAddIcon/>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Administrador"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Link>


        <Link color="#777777" component={RouterLink} to = "/Producto" sx={{textDecoration: "none"}}>
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
                  <AddIcon/>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Producto"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Link>
        
        <Link color="#777777" component={RouterLink} to = "/Categorias" sx={{textDecoration: "none"}}>
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
                  <CategoryIcon/>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Categoría"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Link>
                  

        <Link color="#777777" component={RouterLink} to = "/About" sx={{textDecoration: "none"}}>
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
                  <InfoIcon/>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Acerca De"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Link>

        <Link color="#777777" component={RouterLink} to = "/Perfil" sx={{textDecoration: "none"}}>
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
                  <ManageAccountsIcon/>
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
