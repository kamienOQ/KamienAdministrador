import { useEffect, useMemo, useState } from 'react';
import {Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { UserActions } from './';
import { getAllUsers } from '../../firebase/providers';

export const Administradores = () =>{   
    const [usuarios,setUser] = useState([])
    const [pageSize, setPageSize] = useState(20);
    const [rowId, setRowId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const usuariosTotales = await getAllUsers()
            setUser(usuariosTotales); 
          };
        fetchData();
    },[])    

        const columns = useMemo(
            () => [
                { 
                    field: 'nombre', 
                    headerName: 'Nombre',
                     width: 200
                },
                { 
                    field: 'correo', 
                    headerName: 'Correo',
                    width: 200
                },
                {
                  field: 'createdAt',
                  headerName: 'Fecha de Creación',
                  width: 150,
                  renderCell: (params) =>
                    moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
                },
                { 
                    field: 'id', 
                    headerName: 'Id',
                     width: 100 
                },
                { 
                    field: 'numero', 
                    headerName: 'Número de teléfono',
                    width: 100 
                },
                {
                    field: 'habilitado',
                    headerName: 'Estado',
                    width: 100,
                    renderCell: (params) =>(
                        <div style = {params.row.habilitado ? {color:"green"} :{ color:"red"}}>
                            { params.row.habilitado ? "Activo": "Deshabilitado"}
                        </div>
                    )
                },
                {
                  field: 'actions',
                  headerName: 'Acciones',
                  type: 'actions',
                  width: 200,
                  renderCell: (params) => (
                     <UserActions rowParams = {params.row} params = {params} setUser = {setUser}/> 
                  ),
                },
                
              ],
              [rowId]
            );

    return(
        <>
            <Box
            sx={{
                height: 500,
                marginTop: '4.78%',
                marginLeft: '4.9%',
                maxWidth: '95%'
                }}
            >
                <Box
                sx = 
                {{
                    display : "flex",
                    justifyContent: "space-between"
                }}
                >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ mt: 3, mb: 3,marginLeft: "5%",color : "black"}}
                >
                    Administración de usuarios
                </Typography>
                </Box>
                <DataGrid  
                    columns={columns}
                    rows={usuarios}
                    getRowId={(row) => row.id}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    getRowSpacing={() => ({
                    top: 5,
                    bottom:  5,
                    })}
                    sx={{
                    color: 'dark.main',
                    maxWidth: "1162px",
                    my: "0",
                    mx: "auto",
                    ".MuiDataGrid-columnHeaders": {bgcolor: "info.main", color: "white"},
                    ".MuiIconButton-root": {color: "white"},
                    ".MuiDataGrid-row:nth-of-type(even)": {bgcolor: "secondary.main"},
                    ".MuiDataGrid-footerContainer": {bgcolor: "info.main", color: "white"},
                    ".MuiTablePagination-toolbar": {color: "white"},
                    ".MuiTablePagination-toolbar svg": {color: "white"},
                    }}

                />
            </Box>
        </>
    )
}