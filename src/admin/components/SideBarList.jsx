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
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link as RouterLink } from "react-router-dom";

export const SideBarList = () => {
  return (
    <List sx={{ bgcolor: "primary.main" }}>
        <Link color="dark.main" component={RouterLink} to = "/Administradores" sx={{textDecoration: "none"}}>
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
        </Link>


        <Link color="dark.main" component={RouterLink} to = "/Producto" sx={{textDecoration: "none"}}>
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
        </Link>
        
        <Link color="dark.main" component={RouterLink} to = "/Categorias" sx={{textDecoration: "none"}}>
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
        </Link>

        <Link color="dark.main" component={RouterLink} to = "/Attributes" sx={{textDecoration: "none"}}>
        <ListItem key= "Añadir Atributo" disablePadding sx={{ display: 'block' }}>
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
                  <LocalOfferOutlinedIcon sx={{ color: "dark.main" }}/>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Atributo"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Link>
                  

        <Link color="dark.main" component={RouterLink} to = "/About" sx={{textDecoration: "none"}}>
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
        </Link>

        <Link color="dark.main" component={RouterLink} to = "/Perfil" sx={{textDecoration: "none"}}>
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
        </Link>
    </List>
  )
}
