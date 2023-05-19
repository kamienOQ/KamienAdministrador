import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useOrdersStore, useOrdersUi } from "../../../hooks";

export const OrdersEdit = () => {
  const {
    openEditModal,
    activeOrder,
    closeEditModal,
    isSaving,
    errorMessage,
    addErrorMessage,
  } = useOrdersUi();
  const { startUpdateOrderStatus, changeEditSuccess } = useOrdersStore();
  const [status, setStatus] = useState(activeOrder?.status);

  useEffect(() => {
    setStatus(activeOrder?.status);
  }, [activeOrder?.status]);

  const onChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const onSave = () => {
    if (activeOrder?.status !== status) {
      startUpdateOrderStatus(status);
      changeEditSuccess(true);
    } else {
      addErrorMessage("No ha cambiado el estado del pedido");
    }
  };

  return (
    <Modal
      open={openEditModal}
      onClose={closeEditModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid
        container
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          color: "dark.main",
          p: 4,
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            textAlign: "center",
            width: "100%",
            p: 2,
            fontSize: "24px",
            bgcolor: "dark.main",
            color: "white",
            borderRadius: "10px",
          }}
        >
          Editar el estado
        </Typography>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status || ""}
              label="Estado"
              onChange={onChangeStatus}
            >
              <MenuItem value={"Pendiente"}>Pendiente</MenuItem>
              <MenuItem value={"En envío"}>En envío</MenuItem>
              <MenuItem value={"Entregado"}>Entregado</MenuItem>
              <MenuItem value={"Cancelado"}>Cancelado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} display={!!errorMessage ? "" : "none"} sx={{ mt: 2 }}>
          <Alert severity="error">{errorMessage}</Alert>
        </Grid>
        <Grid container className="action-buttons" sx={{ mt: 2 }}>
          <Button
            className="cancelCategory-button"
            onClick={closeEditModal}
            variant="contained"
            sx={{ backgroundColor: "error.main", borderRadius: 20 }}
            disabled={isSaving}
          >
            <CloseIcon />
          </Button>

          <Button
            className="addCategory-modal-button"
            onClick={onSave}
            variant="contained"
            sx={{
              backgroundColor: "success.main",
              color: "tertiary.main",
              borderRadius: 20,
            }}
            disabled={isSaving}
          >
            <CheckIcon />
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};
