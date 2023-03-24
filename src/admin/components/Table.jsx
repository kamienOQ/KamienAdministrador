import { useCallback, useMemo, useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";

export const Table = ({ attributes, data }) => {
  const [rowId, setRowId] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const columns = useMemo(() => attributes, [rowId]);


  return (
    <>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        getRowSpacing={() => ({
          top: 5,
          bottom: 5,
        })}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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
