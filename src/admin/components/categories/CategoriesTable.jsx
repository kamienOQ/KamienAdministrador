import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useCategoriesStore } from "../../../hooks";


export const CategoriesTable = ({ attributes, data }) => {

  const { filter, filtering, changeFilterCategory, changeFilteringCategory, startFilterCategories, startGetCategories, isLoading, numberCategories, changePageAndSizeCategory } = useCategoriesStore();
  const [rowId, setRowId] = useState(null);

  const [filterModel, setFilterModel] = useState({items: []});
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const [localFilterValue, setLocalFilterValue] = useState('');
  const [sortModel, setSortModel] = useState([]);

  const [rowCountState, setRowCountState] = useState(numberCategories || 0);

  // * Pagination
  const onPaginationChange = useCallback(
    (newModel) => {
      setPaginationModel(newModel);
      changePageAndSizeCategory(newModel);
    },
    [setPaginationModel]
  );

  const onGetRowId = useCallback((row) => row.id, []);

  useEffect(() => {
    if(!filtering){
      startGetCategories(paginationModel.page, paginationModel.pageSize);
    }if(filtering){
      startFilterCategories(paginationModel.page, paginationModel.pageSize, localFilterValue);
    }
  }, [paginationModel]);

  useEffect(() => {
    setRowCountState(numberCategories !== undefined ? numberCategories : 0);
  }, [numberCategories, setRowCountState]);

  const columns = useMemo(() => attributes, [rowId]);


  // * Filter
  const handleSearch = () => {
    if (!filtering || filter.value === 'asc' || filter.value === 'desc' || filter.value !== localFilterValue ) {
      if (Object.keys(filter).length > 0 && filter.field !== undefined && filter.field !== undefined) {
        startFilterCategories(paginationModel.page, paginationModel.pageSize, localFilterValue);
        changeFilteringCategory(true);
        setLocalFilterValue(filter.value);
      }
    }
  };

  const handleRemoveFilter = () => {
    startGetCategories(paginationModel.page, paginationModel.pageSize);
    changeFilteringCategory(false);
    changeFilterCategory({});
    setSortModel([]);
    setLocalFilterValue('');
    setFilterModel({items: []});
  };

  const handleFilterChange = ({ items }) => {
    if (items[0]?.value) {
      changeFilterCategory({ field: items[0]?.field, value: items[0]?.value });
      setSortModel([]);
      changeFilteringCategory(false);
    }if (items.length === 0) {
      if(filtering){
        startGetCategories(paginationModel.page, paginationModel.pageSize);
      }
      changeFilteringCategory(false);
      changeFilterCategory({});
    }
    setFilterModel({ items });
  };

  const handleSortModelChange = (event) => {
    setSortModel(event);
    changeFilterCategory({ field: event[0]?.field, value: event[0]?.sort });
    setFilterModel({items: []});
    changeFilteringCategory(false);
  };

  
  return (
    <Grid container
      className="container-table"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', maxWidth: "1172px", height: 450, my: "0", mx: "auto", gap: .6, overflowX: 'auto', }}
    >
      <Grid
        className="container-buttons-filter"
        sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', width: "1160px"}}
      >
        <Button
          className="button-filter"
          sx={{ height: 40, backgroundColor: 'filter.main', color: 'tertiary.main', '&:hover': { bgcolor: "lightInfo.main" }, }}
          onClick={handleSearch}
          startIcon={<FilterAltIcon />}
        >
          Filtrar
        </Button>
        {filtering ? (
          <Button
            sx={{
              height: 40,
              backgroundColor: "error.main",
              color: "tertiary.main",
              "&:hover": { bgcolor: "lightError.main" },
              ml: 1,
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
        disableColumnSelector
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
        filterOperators={{ date: [{ label: '>', value: 'gt' }] }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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