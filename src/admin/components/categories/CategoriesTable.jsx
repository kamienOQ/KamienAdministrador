import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useCategoriesStore } from "../../../hooks";


export const CategoriesTable = ({ attributes, data }) => {

<<<<<<< HEAD
  const { filter, filtering, changeFilter, changeFiltering, startFilterCategories, startGetCategories, isLoading, numberCategories, changePageAndSize } = useCategoriesStore();
=======
  const { filter, filtering, changeFilterCategory, changeFilteringCategory, startFilterCategories, startGetCategories, isLoading, numberCategories, changePageAndSizeCategory } = useCategoriesStore();
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
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
<<<<<<< HEAD
      changePageAndSize(newModel);
=======
      changePageAndSizeCategory(newModel);
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
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

<<<<<<< HEAD
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter" ) {
        if (!filtering || filter.value !== localFilterValue ) {
          handleSearch()
        }
      }
    };
    document.addEventListener("keyup", handleKeyPress);
    return () => {
      document.removeEventListener("keyup", handleKeyPress);
    };
  }, [filtering, filter.value, localFilterValue]);

=======
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
  const columns = useMemo(() => attributes, [rowId]);


  // * Filter
  const handleSearch = () => {
<<<<<<< HEAD
    if (!filtering || filter.value !== localFilterValue ) {
      if (Object.keys(filter).length > 0 && filter.field !== undefined) {
        onPaginationChange({...paginationModel, page: 0});
        startFilterCategories(paginationModel.page, paginationModel.pageSize, localFilterValue);
        changeFiltering(true);
=======
    if (!filtering || filter.value === 'asc' || filter.value === 'desc' || filter.value !== localFilterValue ) {
      if (Object.keys(filter).length > 0 && filter.field !== undefined && filter.field !== undefined) {
        startFilterCategories(paginationModel.page, paginationModel.pageSize, localFilterValue);
        changeFilteringCategory(true);
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
        setLocalFilterValue(filter.value);
      }
    }
  };

<<<<<<< HEAD
  const handleSort = (value) => {
    if (!filtering || value.value !== localFilterValue ) {
      if (Object.keys(value).length > 0 && value.field !== undefined) {
        onPaginationChange({...paginationModel, page: 0});
        startFilterCategories(paginationModel.page, paginationModel.pageSize, localFilterValue);
        changeFiltering(true);
        setLocalFilterValue(value.value);
      }else if (localFilterValue === "asc" || localFilterValue === "desc") {
        handleRemoveFilter();
      }
    }
  };

  const handleRemoveFilter = () => {
    startGetCategories(paginationModel.page, paginationModel.pageSize);
    changeFiltering(false);
    changeFilter({});
=======
  const handleRemoveFilter = () => {
    startGetCategories(paginationModel.page, paginationModel.pageSize);
    changeFilteringCategory(false);
    changeFilterCategory({});
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
    setSortModel([]);
    setLocalFilterValue('');
    setFilterModel({items: []});
  };

  const handleFilterChange = ({ items }) => {
    if (items[0]?.value) {
<<<<<<< HEAD
      changeFilter({ field: items[0]?.field, value: items[0]?.value });
      setSortModel([]);
      changeFiltering(false);
=======
      changeFilterCategory({ field: items[0]?.field, value: items[0]?.value });
      setSortModel([]);
      changeFilteringCategory(false);
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
    }if (items.length === 0) {
      if(filtering){
        startGetCategories(paginationModel.page, paginationModel.pageSize);
      }
<<<<<<< HEAD
      changeFiltering(false);
      changeFilter({});
=======
      changeFilteringCategory(false);
      changeFilterCategory({});
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
    }
    setFilterModel({ items });
  };

  const handleSortModelChange = (event) => {
    setSortModel(event);
<<<<<<< HEAD
    changeFilter({ field: event[0]?.field, value: event[0]?.sort });
    setFilterModel({items: []});
    changeFiltering(false);
    handleSort({ field: event[0]?.field, value: event[0]?.sort });
=======
    changeFilterCategory({ field: event[0]?.field, value: event[0]?.sort });
    setFilterModel({items: []});
    changeFilteringCategory(false);
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
  };

  
  return (
    <Grid container
      className="container-table"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', maxWidth: "1172px", height: 450, my: "0", mx: "auto", gap: .6, overflowX: 'auto', }}
    >
      <Grid
        className="container-buttons-filter"
<<<<<<< HEAD
        sx={{display: 'flex', alignItems: 'center', justifyContent: 'left', width: "1160px"}}
      >
        {/* <Button
=======
        sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', width: "1160px"}}
      >
        <Button
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
          className="button-filter"
          sx={{ height: 40, backgroundColor: 'filter.main', color: 'tertiary.main', '&:hover': { bgcolor: "lightInfo.main" }, }}
          onClick={handleSearch}
          startIcon={<FilterAltIcon />}
        >
          Filtrar
<<<<<<< HEAD
        </Button> */}
        {filtering ? (
          <Button
            className="remove-filter-category"
=======
        </Button>
        {filtering ? (
          <Button
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
            sx={{
              height: 40,
              backgroundColor: "error.main",
              color: "tertiary.main",
              "&:hover": { bgcolor: "lightError.main" },
<<<<<<< HEAD
=======
              ml: 1,
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
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
<<<<<<< HEAD
        disableColumnHeaderSelection
        disableSelectionOnClick
=======
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
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
<<<<<<< HEAD
          }, 
          ".MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          
=======
          },
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
        }}
      />
    </Grid>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
