import { Button, Grid, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from "react";
import { useAttributesStore, useUiStore } from "../../hooks";
import { Attributes, AttributeModal } from "../components";


export const AttributesCrud = () => {
  const { openAttributeModal, closeAttributeModal } = useUiStore();
  const { isSaving, message, addNewAttribute, startGetAttributes } = useAttributesStore();

  useEffect(() => {
    if (!!message.success) {
      closeAttributeModal();
    }
  }, [message.success]);

  useEffect(() => {
    startGetAttributes();
  }, [])

  const onOpenModal = () => {
    addNewAttribute();
    openAttributeModal();
  }

  return (
    <Grid container
      className="attributes-container"
      spacing={0}
      alignContent="start"
    >
      <Grid container
        sx={{
          height: 450,
          marginLeft: "5%",
          maxWidth: "95%",
        }}
      >
        <Grid container
          className="secundary-attributes-container"
          spacing={2}
          sx={{ padding: 4, mt: 8, borderRadius: 1.2, display: 'flex', direction: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid item 
            sx={{ width: "90%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography variant="h4">Gestión de Atributos</Typography>
            <Button
              className="addAttribute-button"
              onClick={onOpenModal}
              startIcon={<AddCircleIcon />}
              sx={{ backgroundColor: 'golden.main', minWidth: 0, color: "tertiary.main" }}
              variant='contained'
              disabled={isSaving}
            >
              Nuevo Atributo
            </Button>
          </Grid>
        </Grid>
        <Attributes />
        <AttributeModal />
      </Grid>
    </Grid>
  )
}