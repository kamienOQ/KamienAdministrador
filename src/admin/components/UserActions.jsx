
import { Box, Fab } from '@mui/material';
import { useState } from 'react';
import { ConfirmationModal } from './confirmationModal';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { grey,red } from '@mui/material/colors';
import { EditUserModal } from './EditUserModal';
export const UserActions = ({rowParams}) => {
  const [openEditModal,setEditModal] = useState(false)
  const [openConfirmationModal,setConfirmationModal] = useState(false)
  const handleOpen = () =>
  {
    setEditModal(true)
  }
  const handleConfirmationModalOpen = () =>{
    setConfirmationModal(true)
  }
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
            bgcolor: grey[500],
            '&:hover': { bgcolor: grey[700] },
          }}
        >
            <EditIcon />
        </Fab>

        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: red[800],
            '&:hover': { bgcolor: red[900] },
          }}
          onClick = {handleConfirmationModalOpen}
        >
            <CancelIcon />
        </Fab>
        </Box>
        <ConfirmationModal 
        open = {openConfirmationModal } 
        setOpen = {setConfirmationModal}
        msg = {"¿Seguro que quieres eliminar el usuario?"}
        userParams = {rowParams} 
        />
        <EditUserModal open = {openEditModal} setOpen = {setEditModal} userParams ={rowParams}/>
    </>
  )
}
