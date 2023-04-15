import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useAttributesStore } from "../../../hooks";


export const AttibutesTable = ({ attributes, data }) => {

  const { filter, filtering, changeFilter, changeFiltering, startFilterAttributes, startGetAttributes, isLoading, numberCategories, changePageAndSize } = useAttributesStore();
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
      changePageAndSize(newModel);
    },
    [setPaginationModel]
  );

  const onGetRowId = useCallback((row) => row.id, []);

  useEffect(() => {
    if(!filtering){
      startGetAttributes(paginationModel.page, paginationModel.pageSize);
    }if(filtering){
      startFilterAttributes(paginationModel.page, paginationModel.pageSize, localFilterValue);
    }
  }, [paginationModel]);
  

  useEffect(() => {
    setRowCountState(numberCategories !== undefined ? numberCategories : 0);
  }, [numberCategories, setRowCountState]);


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

  const columns = useMemo(() => attributes, [rowId]);


  // * Filter
  const handleSearch = () => {
    if (!filtering || filter.value !== localFilterValue ) {
      if (Object.keys(filter).length > 0 && filter.field !== undefined) {
        onPaginationChange({...paginationModel, page: 0});
        startFilterAttributes(paginationModel.page, paginationModel.pageSize, localFilterValue);
        changeFiltering(true);
        setLocalFilterValue(filter.value);
      }
    }
  };

  const handleSort = (value) => {
    if (!filtering || value.value !== localFilterValue ) {
      if (Object.keys(value).length > 0 && value.field !== undefined) {
        onPaginationChange({...paginationModel, page: 0});
        startFilterAttributes(paginationModel.page, paginationModel.pageSize, localFilterValue);
        changeFiltering(true);
        setLocalFilterValue(value.value);
      }else if (localFilterValue === "asc" || localFilterValue === "desc") {
        handleRemoveFilter();
      }
    }
  };


  const handleRemoveFilter = () => {
    startGetAttributes(paginationModel.page, paginationModel.pageSize);
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
        startGetAttributes(paginationModel.page, paginationModel.pageSize);
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
        sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', width: "1160px"}}
      >
        {/* <Button
          className="button-filter"
          sx={{ height: 40, backgroundColor: 'filter.main', color: 'tertiary.main', '&:hover': { bgcolor: "lightInfo.main" }, }}
          onClick={handleSearch}
          startIcon={<FilterAltIcon />}
        >
          Filtrar
        </Button> */}
        {filtering ? (
          <Button
            className="remove-filter-attributes"
            sx={{
              height: 40,
              backgroundColor: "error.main",
              color: "tertiary.main",
              "&:hover": { bgcolor: "lightError.main" },
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
          ".MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        }}
      />
    </Grid>
  );
};
