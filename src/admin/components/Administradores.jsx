
import {
    Avatar,
    Card,
    Container,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Rating,
    Tooltip,
  } from '@mui/material';
//   import { useValue } from '../../context/ContextProvider';
  import { StarBorder } from '@mui/icons-material';
  import image from "../pages/Empty_pp.jpg"
const Administradores = () =>{
    return(
        <>
         <Container>
            <ImageList
            gap={12}
            sx={{
            mb: 8,
            gridTemplateColumns:
                'repeat(auto-fill, minmax(280px, 1fr))!important',
            }}
            >
                <Card key={"1231"}>
                {/* <Card key={room._id}> */}
                    <ImageListItem sx={{ height: '100% !important' }}>
                        <ImageListItemBar
                        sx={{
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                        }}
                        title={"$ 2000"}
                        actionIcon={
                            <Tooltip title={"Nombre"} sx={{ mr: '5px' }}>
                                <Avatar src={image} />              
                            </Tooltip>
                            }
                        position="top"
                        />    
                    </ImageListItem>
                            
                </Card>

             </ImageList>
         </Container>
        </>
    )
}
export default Administradores;