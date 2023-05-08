import { Button, Grid, Typography, TextField} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useEffect, useState } from "react";
import { useAboutStore } from "../../hooks/useAboutStore";
import { useAboutForm } from "../../hooks";

export const AboutCrud = () => {
  
  useEffect(() => {
    startGetAbout();
  }, [])

  const { description, instagram, name, whatsapp, setData, startGetAbout, startUpdateAbout } = useAboutStore();

  let aboutData = {
    'description':  description,
    'instagram': instagram,
    'name': name,
    'whatsapp': whatsapp
  }

  const { description: lDescription, instagram: lInstagram, 
    name: lName, whatsapp: lWhatsapp, onInputChange, formState } = useAboutForm(aboutData);  


  // useEffect(() => {
  //   console.log('Hola')
  //   aboutData = formState;
  // }, [formState])
  
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setData([formState]);
    startUpdateAbout();
    setEditMode(false);
  };

  return (

    <div className="about-container">
      <div className="about-container-left">
        <Typography variant="h4">Acerca de Nosotros</Typography>
        <Typography variant="h6" gutterBottom>
          Información de la Tienda
        </Typography>
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
            <Button variant="contained" onClick={handleEdit} startIcon={<EditIcon />}>
              Editar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

