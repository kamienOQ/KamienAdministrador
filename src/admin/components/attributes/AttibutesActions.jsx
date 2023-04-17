import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Fab, Switch,Tooltip} from '@mui/material';
import { useAttributesStore, useAttUiStore } from '../../../hooks';
import { CountertopsOutlined } from '@mui/icons-material';

export const AttibutesActions = ({ row }) => {

  const { openCategoryModal, openModalView, setCategoriesSelected, setAttributesSelected } = useAttUiStore();
  const { changeEditing, setActiveCategory, changePreCategoryName, changeActive, startChangeActiveCategory } = useAttributesStore();

  const handleActive = () => {
    setActiveCategory(row);
    changeActive();
    startChangeActiveCategory();
  }
  
  const handleOpenEdit = () => {
    setActiveCategory(row);
    //console.log(row);
    setAttributesSelected(row.attributesRelated);
    setCategoriesSelected(row.categoriesRelated);
    changePreCategoryName(row.attributeName);
    changeEditing(true);
    openCategoryModal();
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
        <Tooltip title="Activar/Desactivar">
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