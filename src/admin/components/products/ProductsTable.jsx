import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useProductsStore } from "../../../hooks";


export const ProductsTable = ({ attributes, data }) => {
  const { filter, filtering, changeFilter, changeFiltering, startFilterProducts, startGetProducts, isLoading,
    numberProducts, changePageAndSize
  } = useProductsStore();
  const [rowId, setRowId] = useState(null);

  const [filterModel, setFilterModel] = useState({ items: [] });
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
    if (!filtering) {
      startGetProducts(paginationModel.page, paginationModel.pageSize);
    } if (filtering) {
      startFilterProducts(paginationModel.page, paginationModel.pageSize, localFilterValue);
    }
  }, [paginationModel]);

  useEffect(() => {
    setRowCountState(numberProducts !== undefined ? numberProducts : 0);
  }, [numberProducts, setRowCountState]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (!filtering || filter.value !== localFilterValue) {
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
    if (!filtering || filter.value !== localFilterValue) {
      if (Object.keys(filter).length > 0 && filter.field !== undefined) {
        // onPaginationChange({...paginationModel, page: 0});
        startFilterProducts(paginationModel.page, paginationModel.pageSize, localFilterValue);
        changeFiltering(true);
        setLocalFilterValue(filter.value);
      }
    }
  };

  const handleSort = (value) => {
    if (!filtering || value.value !== localFilterValue) {
      if (Object.keys(value).length > 0 && value.field !== undefined) {
        startFilterProducts(paginationModel.page, paginationModel.pageSize, localFilterValue);
        changeFiltering(true);
        setLocalFilterValue(value.value);
      } else if (localFilterValue === "asc" || localFilterValue === "desc") {
        handleRemoveFilter();
      }
    }
  };

  const handleRemoveFilter = () => {
    startGetProducts(paginationModel.page, paginationModel.pageSize);
    changeFiltering(false);
    changeFilter({});
    setSortModel([]);
    setLocalFilterValue('');
    setFilterModel({ items: [] });
  };

  const handleFilterChange = ({ items }) => {
    if (items[0]?.value) {
      changeFilter({ field: items[0]?.field, value: items[0]?.value });
      setSortModel([]);
      changeFiltering(false);
    } if (items.length === 0) {
      if (filtering) {
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
    setFilterModel({ items: [] });
    changeFiltering(false);
    handleSort({ field: event[0]?.field, value: event[0]?.sort });
  };

  // Ajust dinamically the height of the table acocording to the page size
  const getGridHeight = (pageSize) => {
    const rowHeight = 52;
    const headerFooterHeight = 450;
    return (rowHeight * pageSize) + headerFooterHeight;
  };

  return (
    <Grid container
      className="container-table"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        maxWidth: "1200px",
        height: getGridHeight(paginationModel.pageSize),
        my: "0",
        mx: "auto",
        gap: .6,
        overflowX: 'auto',
        '@media (min-width: 200px)': {
          marginTop: "-10px"
        },
        '@media (min-width: 300px)': {
          marginBottom: "-400px"
        },
        '@media (min-width: 375px)': {
          marginBottom: "-400px",
          marginTop: "-15px",
        },
        '@media (min-width: 412px) and (min-height: 600px)': {
          maxWidth: "873px",
          maxHeight: "410px",
          marginTop: "-80px",
        },
        '@media (min-width: 500px)': {
          maxWidth: "873px",
          maxHeight: "420px",
          marginBottom: "-300px"
        },
        '@media (min-width: 800px) and (min-height: 900px)': {
          maxWidth: "873px",
          maxHeight: "420px",
          marginBottom: "-400px"
        },
        '@media (min-width: 1024px) and (min-height: 600px)': {
          maxWidth: "873px",
          maxHeight: "420px",
          marginBottom: "-330px"
        },
        '@media (min-width: 1024px) and (min-height: 800px)': {
          maxWidth: "1200px",
          maxHeight: "420px",
          marginBottom: "-400px"
        },
        '@media (min-width: 1200px) and (min-height: 800px)': {
          maxWidth: "1200px",
          maxHeight: "420px",
          marginBottom: "-400px"
        },
      }}
    >
      <Grid
        className="container-buttons-filter"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', width: "1160px" }}
      >
        <Button
          className="button-filter"
          sx={{ 
            height: 40, 
            marginRight: 10, 
            backgroundColor: 'filter.main', 
            color: 'tertiary.main', 
            '&:hover': { bgcolor: "lightInfo.main" }, 
            left: 5,
            '@media (min-width: 1024px)': {
              marginLeft: 1
            },
          }}
          onClick={handleSearch}
          startIcon={<FilterAltIcon />}
        >
          Filtrar
        </Button>
        {filtering ? (
          <Button
            className="remove-filter-product"
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
        disableColumnHeaderSelection
        disableSelectionOnClick
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
          '@media (min-width: 200px)': {
            maxHeight: "390px"
          },
          '@media (min-width: 1024px) and (min-height: 600px)': {
            maxWidth: "1150px"
          },
          '@media (min-width: 1024px) and (min-height: 800px)': {
            maxWidth: "1180px",
          },
        }}
      />
    </Grid>
  );
};
