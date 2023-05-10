import { getGridStringOperators } from "@mui/x-data-grid";
import { useProductsStore } from "../../../hooks";
import { ProductsTable, ProductActions } from "./";


export const Products = () => {

  const { products } = useProductsStore();

  const filterOperatorsName = getGridStringOperators().filter(({ value }) =>
    ['contains'].includes(value),
  );

  const attributes = [
    {
      field: "id",
      headerName: "#",
      type: "number",
      width: 60,
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
    },
    {
      field: "productName",
      headerName: "Nombre",
      width: 300,
      filterable: true,
      sortable: true,
      hideable: false,
      filterOperators: filterOperatorsName,
      onKeyDown: (event) => {
        if (event.key === "Enter") {
          event.stopPropagation();
        }
      },
    },
    {
      field: "price",
      headerName: "Precio",
      width: 100,
      filterable: true,
      sortable: false,
      hideable: false,
      disableColumnMenu: true
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
      disableColumnMenu: true
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
      disableColumnMenu: true
    },
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      width: 200,
      sortable: true,
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