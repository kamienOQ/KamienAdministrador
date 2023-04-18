import { getGridDateOperators, getGridStringOperators } from "@mui/x-data-grid";
import { useCategoriesStore } from "../../../hooks";
import { CategoriesTable, CategoryActions } from "./";


export const Categories = () => {
  const { categories } = useCategoriesStore();

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
      hideable: false,
<<<<<<< HEAD
      disableColumnMenu: true,
=======
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
    },
    {
      field: "categoryName",
      headerName: "Nombre",
      width: 300,
      filterable: true,
      sortable: true,
      hideable: false,
<<<<<<< HEAD
      filterOperators: filterOperatorsName,
      onKeyDown: (event) => {
        if (event.key === "Enter") {
          event.stopPropagation();
        }
      },
=======
      filterOperators: filterOperatorsName
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
    },
    {
      field: "date",
      headerName: "Fecha",
      type: "date",
      // type: "dateTime",
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
<<<<<<< HEAD
      disableColumnMenu: true
=======
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
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
<<<<<<< HEAD
      disableColumnMenu: true
=======
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
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
        <CategoryActions row={params.row}/>
      ]
    },
  ];

  return (
    !!categories && <CategoriesTable attributes={attributes} data={categories} />
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
