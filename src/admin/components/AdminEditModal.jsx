import React, { useState } from 'react';
import { Button, Modal, TextField,Fab } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const AdminEditModal = ({openModal}) => {
    const [open, setOpen] = useState(openModal); // estado para abrir o cerrar el modal
    const [data, setData] = useState([]); // estado para almacenar los datos ingresados en el formulario
    const [formValues, setFormValues] = useState({}); // estado para almacenar los valores del formulario
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setData([...data, formValues]);
      setFormValues({});
      handleClose();
    };
  
    return (
      <div>
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: "info.main",
            color: "white",
            '&:hover': { bgcolor: "info.main" },
          }}
          onClick = {handleOpen}
        >
            <VisibilityIcon />
        </Fab>
        <Modal open={open} onClose={handleClose} >
          <div >
            <h2>Agregar registro</h2>
            <form onSubmit={handleSubmit} >
              <TextField
                name="nombre"
                value={formValues.nombre || ''}
                onChange={handleChange}
              />
              <TextField 
                label="Apellido"
                name="apellido"
                value={formValues.apellido || ''}
                onChange={handleChange}
              />
              <Button type="submit">Guardar</Button>
            </form>
            <ul>
              {data.map((item, index) => (
                <li key={index}>
                  {item.nombre} {item.apellido}
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      </div>
    );
  };    