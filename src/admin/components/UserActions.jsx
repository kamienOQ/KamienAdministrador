
import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { AdminEditModal } from './AdminEditModal';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { grey,red } from '@mui/material/colors';
// import { updateStatus } from '../../../actions/user';
// import { useValue } from '../../../context/ContextProvider';
export const UserActions = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  return (
    <>
        <Box
        sx={{
            m: 1,
            position: 'relative',
            display: 'flex',
            justifyContent : 'space-between',
            minWidth: '100%'
        }}
        >

        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            color: "white",
            '&:hover': { bgcolor: "primary.main" },
          }}
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

          
        <AdminEditModal />

        </Box>
    </>
  )
}

