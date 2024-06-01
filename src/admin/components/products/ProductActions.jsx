import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Fab, Switch, Tooltip } from '@mui/material';
import { useProductsState, useProductsStore, useUiStore } from '../../../hooks';

export const ProductActions = ({ row }) => {

  const { openProductModal, openModalViewProduct, addAttributesSelected, addListAttributesSelected, addCategoriesSelected } = useUiStore();
  const { activeProduct, products, changeEditing, setActiveProduct, changePreProductName, changeActive, startGetProducts,
    startChangeActiveProduct, startGetAttributesForm, starGetCategoriesForm, startDeleteProduct  } = useProductsStore();
  const { setSelected } = useProductsState();

  const handleActive = () => {
    setActiveProduct(row);
    changeActive();
    startChangeActiveProduct();
  }

  const handleOpenEdit = () => {
    setActiveProduct(row);
    changePreProductName(row.productName);
    row.relatedAttributes.forEach(attributeSelected => {
      addAttributesSelected(attributeSelected);
    });
    row.relatedListAttributes.forEach(listAttributeSelected => {
      addListAttributesSelected(listAttributeSelected);
    });
    addCategoriesSelected(row.relatedCategories);
    if (!!row.relatedCategories) {
      setSelected(true);
    }
    changeEditing(true);
    startGetAttributesForm();
    starGetCategoriesForm();
    openProductModal();
  };

  const handleOpenView = () => {
    setActiveProduct(row);
    openModalViewProduct();
  };

  const handleDelete = () => {
    startDeleteProduct (row);
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
        <Tooltip title="Visualizar" >
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
        <Tooltip title="Editar" >
          <Fab
            color="edit"
            sx={{
              width: 40,
              height: 40,
              bgcolor: "edit.main",
              color: "white",
              '&:hover': { bgcolor: "edit.main" },
            }}
            onClick={handleOpenEdit}
          >
            <EditIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="Eliminar">
          <Fab
            color="error"
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'error.main',
              color: 'white',
              '&:hover': { bgcolor: 'error.main' },
            }}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="Activar/Desactivar" >
          <Switch
            checked={!!row?.active ? row?.active : false}
            onChange={handleActive}
            name="Activa"
            color={row?.active ? "success" : "error"}
          />
        </Tooltip>
      </Box>
    </>
  )
}

