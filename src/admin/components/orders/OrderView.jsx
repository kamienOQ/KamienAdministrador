import { Grid, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useOrdersUi } from "../../../hooks";

export const OrdersView = () => {
  const { openViewModal, activeOrder, closeViewModal } = useOrdersUi();

  return (
    <Modal
      open={openViewModal}
      onClose={closeViewModal}
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
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={closeViewModal}
        >
          <CloseIcon />
        </IconButton>
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
          Información del pedido
        </Typography>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Nombre:
            </Typography>
            <Typography>{activeOrder?.name}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Fecha:
            </Typography>
            <Typography>{activeOrder?.stringDate}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Forma de pago:
            </Typography>
            <Typography>{activeOrder?.wayToPay}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Celular:
            </Typography>
            <Typography>{activeOrder?.cellphone}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Dirección:
            </Typography>
            <Typography>{activeOrder?.address}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Estado:
            </Typography>
            <Typography>{activeOrder?.status}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};