import { Grid, Typography } from '@mui/material';
import React from 'react'

export const OrderProducts = ({product, index:index1}) => {
    const uniqueKey = Date.now() + Math.random().toString(36).substr(2, 9);
    return (
            <>
            <Grid
            item
            sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                borderTop: "2px solid black",
                mt: '3px'
            }}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Nombre del producto:
                </Typography>
                <Typography>{product?.name}</Typography>
            </Grid>
            {Object.entries(product?.relatedListAttributes).map(([key, value], index) => (
                <Grid
                item
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
                key={index1+uniqueKey+index}
                >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {key}:
                </Typography>
                <Typography>{value}</Typography>
                </Grid>
            ))}
            <Grid
            item
            sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
            }}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Cantidad:
                </Typography>
                <Typography>{product?.quantity}</Typography>
            </Grid>

            <Grid
            item
            sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
            }}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Precio:
                </Typography>
                <Typography>{product?.quantity*product?.price}</Typography>
            </Grid>
            </>  
    )
}
