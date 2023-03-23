import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Fab } from '@mui/material';
import { useCategoriesStore, useUiStore } from '../../../hooks';

export const CategoryActions = ({ row }) => {

  const { openCategoryModal } = useUiStore();
  const { changeEditing, setActiveCategory } = useCategoriesStore();

  const handleOpen = () => {
    setActiveCategory(row);
    changeEditing(true);
    openCategoryModal();
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
          onClick={handleOpen}
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
