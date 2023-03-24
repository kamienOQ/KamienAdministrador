import { useMemo, useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useCategoriesStore } from "../../../hooks";


export const CategoriesTable = ({ attributes, data }) => {

  const { filter, filtering, changeFilter, changeFiltering, startFilterCategories, startGetCategories } = useCategoriesStore();

  const [rowId, setRowId] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [localFilterValue, setLocalFilterValue] = useState('');
  const [sortModel, setSortModel] = useState([]);

  const columns = useMemo(() => attributes, [rowId]);

  const handleSearch = () => {
    if (!filtering || filter.value === 'asc' || filter.value === 'desc' || (filter.value !== localFilterValue) ) {
      if (Object.keys(filter).length > 0 && filter.field !== undefined && filter.field !== undefined) {
        startFilterCategories();
        changeFiltering(true);
        setLocalFilterValue(filter.value);
      }
    }
  };

  const handleRemoveFilter = () => {
    startGetCategories();
    changeFiltering(false);
    changeFilter({});
    setSortModel([]);
  };

  const handleFilterChange = ({ items }) => {
    if (items[0]?.value) {
      changeFilter({ field: items[0]?.field, value: items[0]?.value });
    } if (items.length === 0) {
      if(filtering){
        startGetCategories();
      }
      changeFiltering(false);
      changeFilter({});
    }
  };

  const handleSortModelChange = (event) => {
    setSortModel(event);
    changeFilter({ field: event[0]?.field, value: event[0]?.sort });
  };


  return (
    // TODO: Crear boton de quitar filtro
    // TODO: Llamar a la cunfión que quita el estado de filtrado y limpia el state de filtros
    <Grid container
      sx={{ display: 'flex', direction: 'column', alignItems: 'center', justifyContent: 'start', maxWidth: "1162px", height: 450, my: "0", mx: "auto", gap: .6 }}
    >
      <Grid item>
        <Button
          sx={{ height: 40, backgroundColor: 'filter.main', color: 'tertiary.main', '&:hover': { bgcolor: "lightInfo.main" }, }}
          onClick={handleSearch}
          startIcon={<FilterAltIcon />}
        >
          Filtrar
        </Button>
        {
          filter.value === 'asc' || filter.value === 'desc' ? (
            <Button
              sx={{ height: 40, backgroundColor: 'error.main', color: 'tertiary.main', '&:hover': { bgcolor: "lightError.main" }, ml: 1 }}
              onClick={handleRemoveFilter}
              startIcon={<CloseIcon />}
            >
              Quitar filtro
            </Button>
          ) : null
        }
      </Grid>
      <DataGrid
        columns={columns}
        rows={data}
        disableColumnSelector
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onFilterModelChange={handleFilterChange}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        filterOperators={{ date: [{ label: '>', value: 'gt' }] }}
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
    </Grid>
  );
};
