import { useProductsStore } from "../../hooks";
import { Table } from "../../admin/components/Table";
import { ProductActions } from "./ProductActions";



export const Product = () => {
  const { products } = useProductsStore();

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
      sortable: false,
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
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
      width: 200,
      // sortable: true,
    },
    {
      field: "image",
      headerName: "Imagen",
      type: "image",
      width: 200,
      filterable: false,
      renderCell: (params) => (
        !!params.value.url && <img src={params.value.url} alt={params.value.name} style={{ width: '35%' }} />
      ),
    },
    {
      field: "icon",
      headerName: "Icono",
      type: "image",
      width: 200,
      filterable: false,
      renderCell: (params) => (
        !!params.value.url && <img src={params.value.url} alt={params.value.name} style={{ width: '25%' }} />
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      width: 200,
      getActions: (params) => [
        <ProductActions row={params.row}/>
      ]
    },
  ];

  return (
    !!products && <Table attributes={attributes} data={products} />
  );
};