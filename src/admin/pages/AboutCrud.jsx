import { Button, Grid, Typography, TextField} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useEffect } from "react";
import { useAttributesStore, useAttUiStore } from "../../hooks";
import { Attributes, AttributeModal, AttributeView } from "../components";
import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter, where } from "firebase/firestore/lite";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import React, { useState } from 'react';



export const AboutCrud = () => {
  const { openCategoryModal, closeCategoryModal, isCategoryModalOpen } = useAttUiStore();
  const { isSaving, message, filtering, addNewCategory, startGetAttributes, startNumberCategories } = useAttributesStore();

  
  const [data, setData] = useState({
    description: "TIENDA VIRTUAL con Artículos 100 % Originales, importamos directamente de USA, envíos a todo el país.",
    instagram: "https:/www.instagram.com/kamien.cr/?igshid=NmQ2ZmYxZjA%3D",
    name: "Kaminen",
    whatsapp: "71095580"
  });

  const [description, setDescription] = useState(data.description);
  const [instagram, setInstagram] = useState(data.instagram);
  const [name, setName] = useState(data.name);
  const [whatsapp, setWhatsapp] = useState(data.whatsapp);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    const updatedData = {
      description: description,
      instagram: instagram,
      name: name,
      whatsapp: whatsapp
    };

    setData(updatedData);


    // Aquí puedes hacer la lógica de actualización de la tabla con los datos actualizados
    // Por ejemplo, puedes llamar a una API para actualizar los datos en el servidor
    setEditMode(false);
  };


  
  useEffect(() => {
    if (!!message.success) {
      closeCategoryModal();
    }
  }, [message.success]);

  useEffect(() => {
    if(!filtering){
      startNumberCategories();
    }
  }, [filtering])
  

  useEffect(() => {
    startGetAttributes();
  }, [])

  const onOpenModal = () => {
    addNewCategory();
    openCategoryModal();
  }

  return (
    <Grid container
      className="categories-container"
      spacing={0}
      alignContent="start"
    >
      <Grid container
        sx={{
          height: 400,
          marginLeft: "5%",
          maxWidth: "95%",
        }}
      >
        <Grid container
          className="secundary-categories-container"
          spacing={2}
          sx={{ padding: 4, mt: 8, borderRadius: 1.2, display: 'flex', direction: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid item 
            sx={{ width: "90%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography variant="h4">Acerca de Nosotros</Typography>
            
          </Grid>

          <div>
      <Typography variant="h6" gutterBottom>
        Información de la Tienda
      </Typography>
      <TextField
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        disabled={!editMode}
        margin="normal"
      />
      <TextField
        label="Instagram"
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
        fullWidth
        disabled={!editMode}
        margin="normal"
      />
      <TextField
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        disabled={!editMode}
        margin="normal"
      />
      <TextField
        label="WhatsApp"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        fullWidth
        disabled={!editMode}
        margin="normal"
      />
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
        </Grid>
        
        {isCategoryModalOpen && 
          <AttributeModal />
        }
        <AttributeView/>
      </Grid>
    </Grid>
  )
}

export const onStartGetAttributes = (page = 0, size = 5) => {
    return async (dispatch) => {
      dispatch(onCleanAttributes());
  
      const collectionRef = collection(FirebaseDB, `/attributes`);
      let q;
  
      if (page === 0) {
        q = query( collectionRef, orderBy("date", "desc"), limit(size) );
      } else {
        const lastVisibleDoc = query( collectionRef,  orderBy("date", "desc"), limit(page * size) );
        const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
        const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
        q = query( collectionRef,  orderBy("date", "desc"), startAfter(lastVisible), limit(size) );
      }
  
      const querySnapshot = await getDocs(q);
  
      const newAttribute = querySnapshot.docs.map((doc, index) => {
        return { id: index + 1 + page * size, ...doc.data() };
      });
      dispatch(onSetAttributes(newAttribute));
      
    }
  }
export const startGetAttributes = (page, size) => {
    dispatch( onStartGetAttributes(page, size) );
}