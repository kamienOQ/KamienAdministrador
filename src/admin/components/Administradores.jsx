import { useEffect, useMemo, useState } from 'react';
import {Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import moment from 'moment';
import { UserActions } from './';
import { getAllUsers } from '../../firebase/providers';
export const Administradores = () =>{
    const [usuarios,setUser] = useState([])
    const [pageSize, setPageSize] = useState(20);
    const [rowId, setRowId] = useState(null);
    const getFilteredData = (data) => {
        return data.filter((obj) => obj.habilitado === true);
      };
    useEffect(() => {
        const fetchData = async () => {
            const usuariosTotales = await getAllUsers()
            const filtered = getFilteredData(usuariosTotales);
            setUser(filtered);
          };
        fetchData();
    },[usuarios])    
        const columns = useMemo(
            () => [
                { 
                    field: 'nombre', 
                    headerName: 'Nombre',
                     width: 200, 
                     editable : true 
                },
                { 
                    field: 'correo', 
                    headerName: 'Correo',
                    width: 200, 
                    editable: true 
                },
                {
                  field: 'createdAt',
                  headerName: 'createdAt',
                  width: 200,
                  renderCell: () =>
                    moment('2023-03-14 12:30:00').format('YYYY-MM-DD HH:MM:SS'),
                    editable : true
                },
                { 
                    field: 'id', 
                    headerName: 'Id',
                     width: 100 
                },
                { 
                    field: 'numero', 
                    headerName: 'Número de teléfono',
                    width: 150 
                },
                {
                  field: 'actions',
                  headerName: 'Acciones',
                  type: 'actions',
                  width: 200,
                  renderCell: (params) => (
                     <UserActions rowParams = {params.row}/> 
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
                    justifyContent: "space-between",
                    background: "#000000",
                    color: "#FFFFFF"
                }}
                >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ mt: 3, mb: 3,marginLeft: "5%" }}
                >
                    Administración de usuarios
                </Typography>
                </Box>
                {usuarios ? 
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
                    sx = {{ 
                    minHeight: "40%",
                    [`& .${gridClasses.columnHeaders}`]: {
                        color: '#000000',
                        bgcolor: '#FFFFFF'
                    }
                    }}
                    />
                    : <h1> Cargando ...
                    </h1>
                }
            </Box>
        </>
    )
}
