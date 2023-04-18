import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
<<<<<<< HEAD
import { Box, Fab, Switch, Tooltip } from '@mui/material';
=======
import { Box, Fab, Switch } from '@mui/material';
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
import { useCategoriesStore, useUiStore } from '../../../hooks';

export const CategoryActions = ({ row }) => {

<<<<<<< HEAD
  const { openCategoryModal, openModalView } = useUiStore();
  const { changeEditing, setActiveCategory, changePreCategoryName, changeActive, startChangeActiveCategory } = useCategoriesStore();

  const handleActive = () => {
    setActiveCategory(row);
    changeActive();
=======
  const { openCategoryModal, openModalViewCategory } = useUiStore();
  const { changeEditingCategory, setActiveCategory, changePreCategoryName, changeActiveCategory, startChangeActiveCategory } = useCategoriesStore();

  const handleActive = () => {
    setActiveCategory(row);
    changeActiveCategory();
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
    startChangeActiveCategory();
  }
  
  const handleOpenEdit = () => {
    setActiveCategory(row);
    changePreCategoryName(row.categoryName);
<<<<<<< HEAD
    changeEditing(true);
=======
    changeEditingCategory(true);
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
    openCategoryModal();
  };

  const handleOpenView = () => {
    setActiveCategory(row);
<<<<<<< HEAD
    openModalView();
=======
    openModalViewCategory();
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
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
<<<<<<< HEAD
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
=======
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

        <Switch
            checked={!!row?.active ? row?.active : false}
            onChange={handleActive}
            name="Activa"
            color="lightSuccess"
          />
      </Box>
    </>
  )
}
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
