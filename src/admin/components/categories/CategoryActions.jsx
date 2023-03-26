import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Fab } from '@mui/material';
import { useCategoriesStore, useUiStore } from '../../../hooks';

export const CategoryActions = ({ row }) => {

  const { openCategoryModal, openModalView } = useUiStore();
  const { changeEditing, setActiveCategory, changePreCategoryName } = useCategoriesStore();

  const handleOpenEdit = () => {
    setActiveCategory(row);
    changePreCategoryName(row.categoryName);
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

        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: "error.main",
            color: "white",
            '&:hover': { bgcolor: "error.main" },
          }}
        >
          <CancelIcon />
        </Fab> 
      </Box>
    </>
  )
}
