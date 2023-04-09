import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Fab, Switch } from '@mui/material';
import { useCategoriesStore, useUiStore } from '../../../hooks';

export const CategoryActions = ({ row }) => {

  const { openCategoryModal, openModalViewCategory } = useUiStore();
  const { changeEditing1, setActiveCategory, changePreCategoryName, changeActive, startChangeActiveCategory } = useCategoriesStore();

  const handleActive = () => {
    setActiveCategory(row);
    changeActive();
    startChangeActiveCategory();
  }
  
  const handleOpenEdit = () => {
    setActiveCategory(row);
    changePreCategoryName(row.categoryName);
    changeEditing1(true);
    openCategoryModal();
  };

  const handleOpenView = () => {
    setActiveCategory(row);
    openModalViewCategory();
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