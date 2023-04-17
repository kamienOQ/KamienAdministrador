import { getGridDateOperators, getGridStringOperators } from "@mui/x-data-grid";
import { useAttributesStore } from "../../../hooks";
import { AttibutesTable, AttibutesActions } from ".";


export const Attributes = () => {
  const { attributes } = useAttributesStore();

  const filterOperatorsName = getGridStringOperators().filter(({ value }) =>
    ['contains'].includes(value),
  );

  const filterOperatorsDate = getGridDateOperators().filter(({ value }) =>
    ['onOrAfter'].includes(value),
  );

  const attributesTable = [
    {
      field: "id",
      headerName: "#",
      type: "number",
      width: 60,
      sortable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: "attributeName",
      headerName: "Nombre",
      width: 200,
      filterable: true,
      sortable: true,
      hideable: false,
      filterOperators: filterOperatorsName
    },
    {
      field: "date",
      headerName: "Fecha",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      width: 200,
      filterable: true,
      sortable: false,
      operatorValue: 'greaterThan',
      hideable: false,
      filterOperators: filterOperatorsDate
    },
    { 
        field: "attributesRelated",
        headerName: "Atributos", 
        width: 250,
        sortable: false,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
      },
      {
        field: "categoriesRelated",
        headerName: "Categorias",
        width: 250,
        sortable: false,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
      },
    
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      width: 200,
      sortable: false,
      filterable: false,
      hideable: false,
      getActions: (params) => [
        <AttibutesActions row={params.row}/>
      ]
    },
  ];

  return (
    !!attributes && <AttibutesTable attributes={attributesTable} data={attributes} />
  );
};
