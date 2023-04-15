import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Fab, Switch, Tooltip } from '@mui/material';
import { useProductsStore, useUiStore } from '../../../hooks';

export const ProductActions = ({ row }) => {

  const { openProductModal, openModalViewProduct } = useUiStore();
  const { changeEditing, setActiveProduct, changePreProductName, changeActive, startChangeActiveProduct } = useProductsStore();

  const handleActive = () => {
    setActiveProduct(row);
    changeActive();
    startChangeActiveProduct();
  }
  
  const handleOpenEdit = () => {
    setActiveProduct(row);
    changePreProductName(row.productName);
    changeEditing(true);
    openProductModal();
  };

  const handleOpenView = () => {
    setActiveProduct(row);
    openModalViewProduct();
  };

  return (
    <>
      <Box
        sx={{
          m: 1,
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          minWidth: '100%'
        }}
      >
        <Tooltip title = "Visualizar" > 
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              bgcolor: "info.main",
              color: "white",
              '&:hover': { bgcolor: "info.main" },
            }}
            onClick={handleOpenView}
          >
            <VisibilityIcon />
          </Fab>
        </Tooltip>
        <Tooltip title = "Editar" >   
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              bgcolor: "primary.main",
              color: "white",
              '&:hover': { bgcolor: "primary.main" },
            }}
            onClick={handleOpenEdit}
          >
            <EditIcon />
          </Fab>
        </Tooltip>
        <Tooltip title = "Activar/Desactivar" >
          <Switch
              checked={!!row?.active ? row?.active : false}
              onChange={handleActive}
              name="Activa"
              color="lightSuccess"
          /> 
        </Tooltip>
      </Box>
    </>
  )
}