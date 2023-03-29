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
            sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
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
                <img className='view-product-image' src={activeProduct?.image?.url} alt="" />
                <Typography variant="h6" sx={{marginTop: 3 }}>
                    {activeProduct?.productName}
                </Typography>
            </DialogContent>
            <img className='view-product-icon' src={activeProduct?.icon?.url} alt="" />
        </Dialog>
    );
}
