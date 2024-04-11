import { Button, Typography, TextField, IconButton, Tooltip, Avatar, Snackbar, Alert } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useEffect, useState } from "react";
import { useAboutStore } from "../../hooks/useAboutStore";
import { useAboutForm } from "../../hooks";
import { deleteFileUpload } from "../../helpers";

export const AboutCrud = () => {

  useEffect(() => {
    startGetAbout();
  }, [])

  const { description, instagram, name, whatsapp, logo,
    isSaving, setData, startUploadFile, startGetAbout, startUpdateAbout } = useAboutStore();

  let aboutData = {
    'description': description,
    'instagram': instagram,
    'name': name,
    'whatsapp': whatsapp
  }

  const { description: lDescription, instagram: lInstagram,
    name: lName, whatsapp: lWhatsapp, onInputChange, formState } = useAboutForm(aboutData);

  const [editMode, setEditMode] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    formState.logo = logo;
    setData([formState]);
    startUpdateAbout();
    setEditMode(false);
    setEditSuccess(true);
  };

  const onUploadImage = ({ target }) => {
    if (target.files.length != 0) {
      if (logo !== '') {
        deleteFileUpload(logo);
      }
      startUploadFile(target.files[0], "about");
    }
  };

  const handleCloseEditMessage = () => {
    setEditSuccess(false);
  };

  return (

    <div className="about-container">
      <Snackbar
        open={editSuccess}
        autoHideDuration={3000}
        onClose={handleCloseEditMessage}
        sx={{
          alignItems: "flex-start", mt: "42px"
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}>
        <Alert onClose={handleCloseEditMessage} severity="success" sx={{ width: '100%' }}>
          Se editó correctamente
        </Alert>
      </Snackbar>

      <div className="about-container-left">
        <Typography variant="h4">Acerca de Nosotros</Typography>
        <Typography variant="h6" gutterBottom>
          Información de la Tienda
        </Typography>
      </div>
      <div className="logo-container">
        <Tooltip title="Logo" >
          <IconButton
            className="addCategory-button"
            color="edit"
            aria-label="cargar imagen"
            component="label"
            onChange={onUploadImage}
            sx={{ color: "edit.main", padding: logo !== '' ? '3px' : '12px' }}
            disabled={!editMode || isSaving}
          >
            <input hidden accept="image/*" type="file" />
            <AddPhotoAlternateIcon style={{ display: logo !== '' ? 'none' : '' }} />
            {logo !== '' &&
              <Avatar
                alt="Imagen"
                src={logo}
              />
            }
          </IconButton>
        </Tooltip>
      </div>
      <TextField
        label="Descripción"
        name="description"
        value={lDescription || ''}
        onChange={onInputChange}
        fullWidth
        disabled={!editMode}
        margin="normal"
      />
      <TextField
        label="Instagram"
        name="instagram"
        value={lInstagram || ''}
        onChange={onInputChange}
        fullWidth
        disabled={!editMode}
        margin="normal"
      />
      <TextField
        label="Nombre"
        name="name"
        value={lName || ''}
        onChange={onInputChange}
        fullWidth
        disabled={!editMode}
        margin="normal"
      />
      <TextField
        label="WhatsApp"
        name="whatsapp"
        value={lWhatsapp || ''}
        onChange={onInputChange}
        fullWidth
        disabled={!editMode}
        margin="normal"
      />
      <div className="about-container-left">
        <div>
          {editMode ? (
            <Button variant="contained" color="success" onClick={handleSave} startIcon={<SaveAltIcon />}>
              Guardar
            </Button>
          ) : (
            <Button variant="contained" color="info" onClick={handleEdit} startIcon={<EditIcon />}>
              Editar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}