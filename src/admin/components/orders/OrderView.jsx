import { Dialog, DialogContent, Grid, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useOrdersUi } from "../../../hooks";
import { OrderProducts } from "./OrderProducts";

export const OrdersView = () => {
  const { openViewModal, activeOrder, closeViewModal } = useOrdersUi();
  

  return (
    <Dialog
      open={openViewModal}
      onClose={closeViewModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
    >
      <DialogContent
        sx={{
          width: 600,
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
          {activeOrder?.products && 
          <>
            <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mt: 1.5,
              mb: .5
            }}
            >
              <Typography variant="subtitle1" sx={{
                textAlign: "center",
                width: "100%",
                fontSize: "24px",
                bgcolor: "dark.main",
                color: "white",
                borderRadius: "10px",
              }}>
                Productos
              </Typography>
            </Grid>
            {activeOrder?.products.map((product, index) => (
              <OrderProducts product={product} index={index} key={index}/>
            ))}
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                borderTop: "2px solid black",
                mt: '3px'
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Total:
              </Typography>
              <Typography>{activeOrder.totalPrice}</Typography>
            </Grid>
          </>
          }
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
