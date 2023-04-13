import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid, esES, gridClasses } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useProductsStore } from "../../../hooks";


export const ProductsTable = ({ attributes, data }) => {

  const { filter, filtering, changeFilter, changeFiltering, startFilterProducts, startGetProducts, isLoadingProduct, numberProducts, changePageAndSize } = useProductsStore();
  const [rowId, setRowId] = useState(null);

  const [filterModel, setFilterModel] = useState({items: []});
  
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const [localFilterValue, setLocalFilterValue] = useState('');
  const [sortModel, setSortModel] = useState([]);

  const [rowCountState, setRowCountState] = useState(numberProducts || 0);

  // * Pagination
  const onPaginationChange = useCallback(
    (newModel) => {
      setPaginationModel(newModel);
      changePageAndSize(newModel);
    },
    [setPaginationModel]
  );

  const onGetRowId = useCallback((row) => row.id, []);

  useEffect(() => {
    if(!filtering){
      startGetProducts(paginationModel.page, paginationModel.pageSize);
    }if(filtering){
      startFilterProducts(paginationModel.page, paginationModel.pageSize, localFilterValue);
    }
  }, [paginationModel]);

  useEffect(() => {
    setRowCountState(numberProducts !== undefined ? numberProducts : 0);
  }, [numberProducts, setRowCountState]);

  const columns = useMemo(() => attributes, [rowId]);


  // * Filter
  const handleSearch = () => {
    if (!filtering || filter.value === 'asc' || filter.value === 'desc' || filter.value !== localFilterValue ) {
      if (Object.keys(filter).length > 0 && filter.field !== undefined && filter.field !== undefined) {
        startFilterProducts(paginationModel.page, paginationModel.pageSize, localFilterValue);
        changeFiltering(true);
        setLocalFilterValue(filter.value);
      }
    }
  };

  const handleRemoveFilter = () => {
    startGetProducts(paginationModel.page, paginationModel.pageSize);
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
    }if (items.length === 0) {
      if(filtering){
        startGetProducts(paginationModel.page, paginationModel.pageSize);
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
  };

  
  return (
    <Grid container
      className="container-table"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', maxWidth: "1172px", height: 450, my: "0", mx: "auto", gap: .6, overflowX: 'auto' }}
    >
      <DataGrid
        className="table"
        columns={columns}
        rows={data}
        disableColumnSelector
        loading={isLoadingProduct}
        rowCount={rowCountState}
        getRowId={onGetRowId}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationChange}
        paginationMode="server"
        //filterModel={filterModel}
        //onFilterModelChange={handleFilterChange}
        //filterMode="server"
        filterOperators={{ date: [{ label: '>', value: 'gt' }] }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        onCellEditCommit={(params) => setRowId(params.id)}
        sx={{
          color: "dark.main",
          maxWidth: "1172px",
          my: "0",
          mx: "auto",
          overflowX: 'auto',
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
    </Grid>
  );
};
