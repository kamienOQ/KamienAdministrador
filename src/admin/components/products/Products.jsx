import { getGridDateOperators, getGridStringOperators } from "@mui/x-data-grid";
import { useProductsStore } from "../../../hooks";
import { ProductsTable, ProductActions } from ".";


export const Products = () => {
  const { products } = useProductsStore();

  const filterOperatorsName = getGridStringOperators().filter(({ value }) =>
    ['contains'].includes(value),
  );

  const filterOperatorsDate = getGridDateOperators().filter(({ value }) =>
    ['onOrAfter'].includes(value),
  );

  const attributes = [
    {
      field: "id",
      headerName: "#",
      type: "number",
      width: 60,
      sortable: false,
      filterable: false,
    },
    {
      field: "productName",
      headerName: "Nombre",
      width: 200,
      filterable: true,
      sortable: true,
      filterOperators: filterOperatorsName
    },
    {
      field: "price",
      headerName: "Precio",
      width: 100,
      filterable: true,
      sortable: false,
    },
    {
      field: "atributes",
      headerName: "Atributos",
      width: 200,
      filterable: true,
      sortable: false,
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
      field: "image",
      headerName: "Imagen",
      type: "image",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        !!params.value.url && <img src={params.value.url} alt={params.value.name} style={{ width: '35%' }} />
      ),
      hideable: false,
    },
    {
      field: "icon",
      headerName: "Icono",
      type: "image",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        !!params.value.url && <img src={params.value.url} alt={params.value.name} style={{ width: '25%' }} />
      ),
      hideable: false,
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
        <ProductActions row={params.row}/>
      ]
    },
  ];

  return (
    !!products && <ProductsTable attributes={attributes} data={products} />
  );
};