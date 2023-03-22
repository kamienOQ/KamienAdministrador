import { useCallback, useEffect, useState } from "react";
/* import { useSelector } from "react-redux"; */
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from "@mui/icons-material/Close";
import { UserActions } from "./UserActions";
import { Table } from "./Table";
import { FirebaseDB } from "../../firebase/config";
import { Fab, Grid, IconButton, Modal, Typography } from "@mui/material";

export const Orders = () => {
  // const { orders } = useSelector((state) => state.orders);

  const [orders, setOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const unSub = onSnapshot(
      query(collection(FirebaseDB, "orders"), orderBy("date", "desc")),
      (querySnapshot) => {
        const newOrders = querySnapshot.docs.map((doc, index) => {
          if (doc.exists()) {
            return { id: index + 1, ...doc.data() };
          }
        });
        setOrders(newOrders);
      }
    );

    return () => {
      unSub();
    };
  }, []);

  const viewOrder = useCallback(
    (row) => () => {
      if (!row.stringDate) {
        const newDate = new Date(row.date);
        const stringDate = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;
        row.stringDate = stringDate;
      }
      setSelectedOrder(row);
      setOpenModal(true);
    },
    []
  );

  const attributes = [
    {
      field: "id",
      headerName: "#",
      type: "number",
      width: 60,
      sortable: false,
      filterable: false,
    },
    { field: "name", headerName: "Nombre", width: 300 },
    {
      field: "date",
      headerName: "Fecha",
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
      width: 200,
      sortable: false,
    },
    {
      field: "wayToPay",
      headerName: "Forma de pago",
      type: "string",
      width: 200,
      filterable: false,
    },
    {
      field: "cellphone",
      headerName: "Celular",
      type: "string",
      width: 200,
      sortable: false,
      filterable: false,
    },
    {
      field: "address",
      headerName: "Dirección",
      type: "string",
      width: 200,
      sortable: false,
      filterable: false,
    },
    {
      field: "status",
      headerName: "Estado",
      type: "singleSelect",
      valueOptions: ["Pendiente", "En envío", "Entregado", "Cancelado"],
      width: 200,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      width: 200,
      getActions: (params) => [
        <Fab
          color="primary"
          onClick={viewOrder(params.row)}
          sx={{
            width: 40,
            height: 40,
            bgcolor: "info.main",
            color: "white",
            '&:hover': { bgcolor: "info.main" },
          }}
        >
            <VisibilityIcon />
        </Fab>,
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            color: "white",
            '&:hover': { bgcolor: "primary.main" },
          }}
        >
            <EditIcon />
        </Fab>,
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: "error.main",
            color: "white",
            '&:hover': { bgcolor: "error.main" },
          }}
        >
            <CancelIcon />
        </Fab>,
      ],
    },
  ];

  return (
    <>
      <Table attributes={attributes} data={orders} />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          container
          sx={{
            position: "absolute",
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
            onClick={() => setOpenModal(false)}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: "center", width: "100%", p: 2, fontSize: "24px", bgcolor: "dark.main", color: "white", borderRadius: "10px"}}>
            Información del pedido
          </Typography>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Grid item sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>Nombre:</Typography>
              <Typography>{selectedOrder?.name}</Typography>
            </Grid>
            <Grid item sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>Fecha:</Typography>
              <Typography>{selectedOrder?.stringDate}</Typography>
            </Grid>
            <Grid item sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>Forma de pago:</Typography>
              <Typography>{selectedOrder?.wayToPay}</Typography>
            </Grid>
            <Grid item sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>Celular:</Typography>
              <Typography>{selectedOrder?.cellphone}</Typography>
            </Grid>
            <Grid item sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>Dirección:</Typography>
              <Typography>{selectedOrder?.address}</Typography>
            </Grid>
            <Grid item sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>Estado:</Typography>
              <Typography>{selectedOrder?.status}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};
