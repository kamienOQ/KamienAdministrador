import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Pagination, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
// import { useValue } from '../../../context/ContextProvider';
// import { getUsers } from '../../../actions/user';
import moment from 'moment';
import { grey,red} from '@mui/material/colors';
import { UserActions, AdminEditModal } from './';
import "./Administradores.css"
import img from  "./Empty_pp.jpg"
import { Margin } from '@mui/icons-material';
import { light } from '@mui/material/styles/createPalette';
export const Administradores = () =>{
    const users = [
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Carolina Chavez ",
            email : "CChavez@gmail.com",
            role : "admin",
            active : true,
            id : "1"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Carlos Pérez",
            email : "CPerez@gmail.com",
            role : "admin",
            active : true,
            id : "2"

        },
        {
            photoURL:"asdsadsadsa",
            name : "Armando Casas",
            email : "ArmandoC@gmail.com",
            role : "admin",
            active : true,
            id : "3"
        },
        {
            photoURL:"asdsadsadsa",
            name : "Juancho Arias",
            email : "JArias@gmail.com",
            role : "admin",
            active : true,
            id : "4"
        }
    ]

    const [pageSize, setPageSize] = useState(5);
    const [rowId, setRowId] = useState(null);
        const columns = useMemo(
            () => [
                {
                  field: 'photoURL',
                  headerName: 'Avatar',
                  width: 60,
                  renderCell: () => <Avatar src={img} />, // users.foto
                  sortable: false,
                  filterable: false,
                },
                { field: 'name', headerName: 'Nombre', width: 300, editable : true },
                { field: 'email', headerName: 'Correo', width: 200, editable: true },
                {
                  field: 'createdAt',
                  headerName: 'Fecha de Creación',
                  width: 200,
                  renderCell: () =>
                    moment('2023-03-14 12:30:00').format('YYYY-MM-DD HH:MM:SS'),
                    editable : true
                },
                { field: 'id', headerName: 'Id', width: 200 },
                {
                  field: 'actions',
                  headerName: 'Acciones',
                  type: 'actions',
                  width: 200,
                  renderCell: () => (
                     <UserActions/>  //{...{ params, rowId, setRowId }} 
                  ),
                },
              ],
              [rowId]
            );
        // useEffect(() => {
        //     setSelectedLink(link);
        //     if (users.length === 0) getUsers(dispatch);
        // }, []);
    return(
        <>
            <Box
            sx={{
                height: 400,
                marginTop: '5%',
                marginLeft: '5%',
                maxWidth: '95%'
                }}
            >
                <Typography
                    variant="h3"
                    component="h3"
                    sx={{ textAlign: 'center', mt: 3, mb: 3 }}
                >
                    Manage Users
                </Typography>
                <DataGrid  
                    columns={columns}
                    rows={users}
                    getRowId={(row) => row.id}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    getRowSpacing={() => ({
                    top: 5,
                    bottom:  5,
                    })}
                    sx={{      
                    color: 'black',
                    bgcolor: 'white',
                        [`& .${gridClasses.columnHeaders}`]: {
                            bgcolor: '#D1B000'
                        }
                      }}
                    // onCellEditCommit={() => setRowId("dwqwdqdwqd")}
                />
            </Box>

        </>
    )
}
