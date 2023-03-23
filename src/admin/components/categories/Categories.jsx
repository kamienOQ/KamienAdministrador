import { useCategoriesStore } from "../../../hooks";
import { Table } from "../Table";
import { CategoryActions } from "./CategoryActions";



export const Categories = () => {
  const { categories } = useCategoriesStore();

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
      field: "categoryName",
      headerName: "Nombre",
      width: 300,
      filterable: true,
      // sortable: false,
    },
    {
      field: "date",
      headerName: "Fecha",
      type: "date",
      // type: "dateTime",
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
        <CategoryActions row={params.row}/>
      ]
    },
  ];

  return (
    !!categories && <Table attributes={attributes} data={categories} />
  );
};
