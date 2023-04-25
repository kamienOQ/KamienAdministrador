import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useOrdersStore } from "../../../hooks";

export const OrdersTable = ({ attributes, data }) => {
  const {
    filter,
    filtering,
    changeFilter,
    changeFiltering,
    startGetOrders,
    startFilterOrders,
    numberOrders,
    isLoading,
    changePageSize,
  } = useOrdersStore();

  const [rowId, setRowId] = useState(null);

  const [filterModel, setFilterModel] = useState({items: []});
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const [localFilterValue, setLocalFilterValue] = useState('');
  const [sortModel, setSortModel] = useState([]);

  const [rowCountState, setRowCountState] = useState(numberOrders || 0);

  const onPaginationChange = useCallback(
    (newModel) => {
      setPaginationModel(newModel);
      changePageSize(newModel.pageSize);
    },
    [setPaginationModel]
  );

  const onGetRowId = useCallback((row) => row.id, []);

  useEffect(() => {
    if (!filtering) {
      startGetOrders(paginationModel.page, paginationModel.pageSize);
    }
    if (filtering) {
      startFilterOrders(
        paginationModel.page,
        paginationModel.pageSize,
        localFilterValue
      );
    }
  }, [paginationModel]);

  useEffect(() => {
    setRowCountState(numberOrders !== undefined ? numberOrders : 0);
  }, [numberOrders, setRowCountState]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (!filtering || filter.value !== localFilterValue ) {
          handleSearch();
        }
      }
    };
    document.addEventListener("keyup", handleKeyPress);
    return () => {
      document.removeEventListener("keyup", handleKeyPress);
    };
  }, [filtering, filter.value, localFilterValue]);

  const columns = useMemo(() => attributes, [rowId]);

  // * Filter
  const handleSearch = () => {
    if (
      !filtering ||
      filter.value !== localFilterValue
    ) {
      if (
       Object.keys(filter).length > 0 &&
        filter.field !== undefined
      ) {
        startFilterOrders(
          paginationModel.page,
          paginationModel.pageSize,
          localFilterValue
        );
        changeFiltering(true);
        setLocalFilterValue(filter.value);
      }
    }
  };

  const handleSort = (value) => {
    if (!filtering || value.value !== localFilterValue ) {
      if (Object.keys(value).length > 0 && value.field !== undefined) {
        startFilterOrders(paginationModel.page, paginationModel.pageSize, localFilterValue);
        changeFiltering(true);
        setLocalFilterValue(value.value);
      } else if (localFilterValue === "asc" || localFilterValue === "desc") {
        handleRemoveFilter();
      }
    }
  };

  const handleRemoveFilter = () => {
    startGetOrders(paginationModel.page, paginationModel.pageSize);
    changeFiltering(false);
    changeFilter({});
    setSortModel([]);
    setLocalFilterValue('');
    setFilterModel({items: []});
  };

  const handleFilterChange = ({ items }) => {
    if (items[0]?.value) {
      changeFilter({ field: items[0]?.field, value: items[0]?.value });
      setSortModel([]);
      changeFiltering(false);
    }
    if (items.length === 0) {
      if (filtering) {
        startGetOrders(paginationModel.page, paginationModel.pageSize);
      }
      changeFiltering(false);
      changeFilter({});
    }
    setFilterModel({ items });
  };

  const handleSortModelChange = (event) => {
    setSortModel(event);
    changeFilter({ field: event[0]?.field, value: event[0]?.sort });
    setFilterModel({items: []});
    changeFiltering(false);
    handleSort({ field: event[0]?.field, value: event[0]?.sort })
  };

  return (
    <Grid container
      className="container-table"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', maxWidth: "1172px", height: 450, my: "0", mx: "auto", gap: .6, overflowX: 'auto', }}
    >
      <Grid
        className="container-buttons-filter"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          width: "1160px",
        }}
      >
        {filtering ? (
          <Button
          className="remove-filter"
            sx={{
              height: 40,
              backgroundColor: "error.main",
              color: "tertiary.main",
              "&:hover": { bgcolor: "lightError.main" },
              ml: "5px",
            }}
            onClick={handleRemoveFilter}
            startIcon={<CloseIcon />}
          >
            Quitar filtro
          </Button>
        ) : null}
      </Grid>
      <DataGrid
        className="table"
        columns={columns}
        rows={data}
        loading={isLoading}
        rowCount={rowCountState}
        getRowId={onGetRowId}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationChange}
        paginationMode="server"
        filterModel={filterModel}
        onFilterModelChange={handleFilterChange}
        filterMode="server"
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        sortingMode="server"
        filterOperators={{ date: [{ label: ">", value: "gt" }] }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              cellphone: false,
              address: false,
            },
          },
        }}
        localeText={{
          ...esES.components.MuiDataGrid.defaultProps.localeText,
          columnMenuManageColumns: "Gestionar columnas",
        }}
        sx={{
          color: "dark.main",
          maxWidth: "1172px",
          my: "0",
          mx: "auto",
          ".MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          ".MuiDataGrid-columnHeaders": {
            bgcolor: "info.main",
            color: "white",
          },
          ".MuiIconButton-root": {
            color: "white",
          },
          ".MuiDataGrid-row:nth-of-type(even)": { bgcolor: "secondary.main" },
          ".MuiDataGrid-footerContainer": {
            bgcolor: "info.main",
            color: "white",
          },
          ".MuiTablePagination-toolbar": {
            color: "white",
          },
          ".MuiTablePagination-toolbar svg": {
            color: "white",
          },
        }}
      />
    </Grid>
  );
};
