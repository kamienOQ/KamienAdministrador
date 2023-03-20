import {
    AppBar,
    Avatar,
    Box,
    Container,
    Dialog,
    IconButton,
    Rating,
    Slide,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
  } from '@mui/material';
import { Close, StarBorder } from '@mui/icons-material';
import { forwardRef, useEffect, useState } from 'react';

import image from "../pages/Empty_pp.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/zoom';
const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" {...props} ref={ref} />;
  });

  const handleClose = () => {
    console.log("Manejar Cierre")
//   dispatch({ type: 'UPDATE_ROOM', payload: null });
  };
// Boolean(room)
const Administrator = () => {
  return (
     <Dialog
      fullScreen
      open={true}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
          <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
                    {/* {Administrados?.title} */}
                    Victor Julio Montero
                </Typography>
                <IconButton color="inherit" onClick={handleClose}>
                    <Close />
                </IconButton>
            </Toolbar>
          </AppBar>
          <Container sx={{ pt: 5 }}>
            <Swiper
                modules={[Navigation, Autoplay, EffectCoverflow, Zoom]}
                centeredSlides
                slidesPerView={2}
                grabCursor
                navigation
                autoplay
                zoom
                effect="coverflow"
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                >



            <SwiperSlide key={"url"}>
              <div className="swiper-zoom-container">
                <img src={image} alt="room" />
              </div>
            </SwiperSlide>
            
                <Tooltip
                title={"Nombre de la sala"}
                sx={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  zIndex: 2,
                }}
              >
                <Avatar src={image} />
              </Tooltip>

            </Swiper>
            <Stack sx={{ p: 3 }} spacing={2}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}
              >
              </Stack>
              <Box>
              <Typography variant="h6" component="span">
                  {'Price Per Night: '}
              </Typography>
              <Typography component="span">
                  { '20123123'}
              </Typography>
            </Box>
            </Stack>

          </Container>
    </Dialog>
  )
}

export default Administrator