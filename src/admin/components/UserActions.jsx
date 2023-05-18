
import { Box, Fab } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { EditUserModal } from './EditUserModal';
import { ConfirmationModal } from './ConfirmationModal';
export const UserActions = ({rowParams,params,setUser}) => {
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
            justifyContent : 'center',
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
          onClick = {handleOpen}
           
        >
            <EditIcon />
        </Fab>

        {/* <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: "error.main",
            color: "white",
            '&:hover': { bgcolor: "error.main" },
          }}
          onClick = {handleConfirmationModalOpen}
        >
            <CancelIcon />
        </Fab> */}
          
        </Box>
        {/* <ConfirmationModal 
        open = {openConfirmationModal } 
        setOpen = {setConfirmationModal}
        msg = {"¿Seguro que quieres eliminar el usuario?"}
        userParams = {rowParams} 
        params = {params} 
        setUser = {setUser}
        /> */}
        <EditUserModal users = {params}setUser = {setUser} open = {openEditModal} setOpen = {setEditModal} userParams ={rowParams}  />
    </>
  )
}
