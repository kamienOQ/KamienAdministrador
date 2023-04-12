import { useAttributesStore } from "../../../hooks";
import { Table } from "../Table";
import { UserActions } from "../UserActions";



export const Attributes = () => {
    const { attributes } = useAttributesStore();

    const attributesL = [
      {
        field: "id",
        headerName: "#",
        type: "number",
        width: 60,
        sortable: false,
        filterable: false,
      },
      { field: "attributeName", headerName: "Nombre", width: 200, filterable: false },
      { 
        field: "attributesList",
        headerName: "Atributos", 
        width: 250, 
      },
      {
        field: "categoriesRelated",
        headerName: "Categorias",
        width: 250,
      },
      {
        field: "date",
        headerName: "Fecha",
        type: "dateTime",
        valueGetter: ({ value }) => value && new Date(value),
        width: 200,
      },
      {
        field: "actions",
        headerName: "Acciones",
        type: "actions",
        width: 200,
        renderCell: () => <UserActions />,
      },
    ];
  
    return (
        !!attributes && <Table attributes={attributesL} data={attributes} />
    );
};
