import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { DataGrid, esES } from "@mui/x-data-grid";
import { startGetOrders } from "../../store/orders";
import { useSelector } from "react-redux";

export const Table = ({ attributes }) => {
  const dispatch = useDispatch();
  const { numberOrders, isLoading, orders } = useSelector((state) => state.orders);

  const [rowId, setRowId] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const [rowCountState, setRowCountState] = useState(numberOrders || 0);

  const onPaginationChange = useCallback(
    (newModel) => {
      setPaginationModel(newModel);
    },
    [setPaginationModel]
  );

  const onGetRowId = useCallback((row) => row.id, []);

  useEffect(() => {
    dispatch(startGetOrders(paginationModel.page, paginationModel.pageSize));
  }, [paginationModel]);

  useEffect(() => {
    setRowCountState(numberOrders !== undefined ? numberOrders : 0);
  }, [numberOrders, setRowCountState]);

  const columns = useMemo(() => attributes, [rowId]);

  return (
    <>
      <DataGrid
        columns={columns}
        rows={orders}
        loading={isLoading}
        rowCount={rowCountState}
        getRowId={onGetRowId}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationChange}
        paginationMode="server"
        initialState={{
          columns: {
            columnVisibilityModel: {
              cellphone: false,
              address: false,
            },
          },
        }}
        localeText={{...esES.components.MuiDataGrid.defaultProps.localeText, columnMenuManageColumns: "Gestionar columnas"}}
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
