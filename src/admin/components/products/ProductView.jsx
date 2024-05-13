import { Modal, Box, Typography, Dialog, DialogContent } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import { useProductsStore, useUiStore } from '../../../hooks';

export const ProductView = () => {
    const { closeModalViewProduct, isModalViewOpenProduct } = useUiStore();
    const { activeProduct } = useProductsStore();

    return (
        <Dialog
            className="modal-container-products"
            open={isModalViewOpenProduct}
            onClose={closeModalViewProduct}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <DialogContent
                className='view-product-container'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    outline: 'none',
                    textAlign: 'center',
                    width: 600,
                    height: 630,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '5px' }}>
                    <img className='view-product-image' src={activeProduct?.image?.url} alt="" />
                    <img className='view-product-icon' src={activeProduct?.icon?.url} alt="" />
                    <img className='view-product-photo' src={activeProduct?.photo?.url} alt="" />
                </Box>
                <Typography variant="h6">
                    {activeProduct?.productName}
                </Typography>
                <Typography variant='h6'>
                    {activeProduct?.relatedCategories}
                </Typography>
                <Typography variant='h6'>
                    {activeProduct?.relatedAttributes + ',' + " "}
                </Typography>
                <Typography variant='h6'>
                    {activeProduct?.relatedListAttributes?.feature}
                </Typography>
            </DialogContent>
        </Dialog>
    );
}
