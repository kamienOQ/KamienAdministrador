import { getGridDateOperators, getGridStringOperators } from "@mui/x-data-grid";
import { OrdersTable } from "./OrdersTable";
import { useOrdersStore } from "../../../hooks";
import { OrderActions } from "./OrderActions";

export const Orders = () => {
  const { orders } = useOrdersStore();

  const filterOperatorsName = getGridStringOperators().filter(({ value }) =>
    ["contains"].includes(value)
  );

  const filterOperatorsDate = getGridDateOperators().filter(({ value }) =>
    ["onOrAfter"].includes(value)
  );

  const attributes = [
    {
      field: "id",
      headerName: "#",
      type: "number",
      minWidth: 60,
      sortable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: "name",
      headerName: "Nombre",
      minWidth: 250,
      hideable: false,
      filterOperators: filterOperatorsName,
    },
    {
      field: "date",
      headerName: "Fecha",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      minWidth: 200,
      sortable: false,
      hideable: false,
      operatorValue: "greaterThan",
      filterOperators: filterOperatorsDate,
    },
    {
      field: "wayToPay",
      headerName: "Forma de pago",
      type: "string",
      minWidth: 200,
      filterable: false,
      hideable: false,
    },
    {
      field: "cellphone",
      headerName: "Celular",
      type: "string",
      minWidth: 200,
      sortable: false,
      filterable: false,
    },
    {
      field: "address",
      headerName: "Dirección",
      type: "string",
      minWidth: 200,
      sortable: false,
      filterable: false,
    },
    {
      field: "status",
      headerName: "Estado",
      type: "singleSelect",
      valueOptions: ["Pendiente", "En envío", "Entregado", "Cancelado"],
      minWidth: 200,
      sortable: false,
      hideable: false,
    },
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      minWidth: 200,
      hideable: false,
      getActions: (params) => [<OrderActions row={params.row} />],
    },
  ];

  return <OrdersTable attributes={attributes} data={orders} />;
};