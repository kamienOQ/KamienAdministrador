import { Box, Fab, Switch,Tooltip} from '@mui/material';
import { useAttributesStore, useAttUiStore } from '../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const AttibutesActions = ({ row }) => {

  const { openCategoryModal, openModalView, setCategoriesSelected, setAttributesSelected } = useAttUiStore();
  const { changeEditing, setActiveCategory, changePreCategoryName, changeActive, startChangeActiveCategory,starGetCategoriesForm } = useAttributesStore();

  const handleActive = () => {
    setActiveCategory(row);
    changeActive();
    startChangeActiveCategory();
  }
  
  const handleOpenEdit = () => {
    setActiveCategory(row);
    setAttributesSelected(row.attributesRelated);
    setCategoriesSelected(row.categoriesRelated);
    changePreCategoryName(row.attributeName);
    changeEditing(true);
    openCategoryModal();
    starGetCategoriesForm();
  };

  const handleOpenView = () => {
    setActiveCategory(row);
    openModalView();
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
        <Tooltip title="Editar">
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
        <Tooltip title="Activar/Desactivar">
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

/*<Fab
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
        </Fab>*/