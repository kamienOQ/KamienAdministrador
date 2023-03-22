import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { UserActions } from "./UserActions";

export const OrdersManagementFilters = () => {
  
  const { orders } = useSelector((state) => state.orders);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [rowId, setRowId] = useState(null);
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "#",
        width: 60,
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Nombre", width: 300, filterable: false, },
      {
        field: "dateString",
        headerName: "Fecha",
        width: 200,
        sortable: false,
      },
      { field: "wayToPay", headerName: "Forma de pago", width: 200, filterable: false, },
      {
        field: "cellphone",
        headerName: "Celular",
        width: 200,
        sortable: false,
        filterable: false,
      },
      {
        field: "address",
        headerName: "Dirección",
        width: 200,
        sortable: false,
        filterable: false,
      },
      {
        field: "status",
        headerName: "Estado",
        width: 200,
        sortable: false,
      },
      {
        field: "actions",
        headerName: "Acciones",
        type: "actions",
        width: 200,
        renderCell: () => (
          <UserActions /> //{...{ params, rowId, setRowId }}
        ),
      },
    ],
    [rowId]
  );

  console.log("Hola");

  return (
    <>
      <DataGrid
        columns={columns}
        rows={orders}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        getRowSpacing={() => ({
          top: 5,
          bottom: 5,
        })}
        sx={{
          color: "dark.main",
          maxWidth: "1162px",
          my: "0",
          mx: "auto",
          ".css-yrdy0g-MuiDataGrid-columnHeaderRow": {
            bgcolor: "info.main",
            color: "white",
          },
          ".css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root": {
            color: "white",
          },
          ".MuiDataGrid-row:nth-of-type(even)": { bgcolor: "secondary.main" },
          ".css-wop1k0-MuiDataGrid-footerContainer": {
            bgcolor: "info.main",
            color: "white",
          },
          ".css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar": {
            color: "white",
          },
          ".css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar svg": {
            color: "white",
          },
        }}
      />
    </>
  );
};
