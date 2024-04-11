import { Snackbar } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
export const UserToast = ({ message, openSnackBar, setOpenSnackBar }) => {
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };
  return (
    <>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            onClick={handleClose}
            style={{
              color: "white",
              position: "static",
              marginBottom: "0%"
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  )
}