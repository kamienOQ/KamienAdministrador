import { useSelector } from "react-redux";
import { UserActions } from "./UserActions";
import { Table } from "./Table";

export const Orders = () => {
  const { orders } = useSelector((state) => state.orders);

  const attributes = [
    {
      field: "getRowId",
      headerName: "#",
      type: "number",
      width: 60,
      sortable: false,
      filterable: false,
    },
    { field: "name", headerName: "Nombre", width: 300, filterable: false },
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
      renderCell: () => <UserActions />,
    },
  ];

  return (
    <Table attributes={attributes} data={orders} />
  );
};
