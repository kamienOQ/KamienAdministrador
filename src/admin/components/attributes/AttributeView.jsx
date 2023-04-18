import { Modal, Box, Typography, Dialog, DialogContent } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import { useAttributesStore, useAttUiStore } from '../../../hooks';

export const AttributeView = () => {
    const { closeModalView, isModalViewOpen } = useAttUiStore();
    const { activeAttribute } = useAttributesStore();
    
    return (
        <Dialog
            className="modal-container-categories"
            open={isModalViewOpen}
            onClose={closeModalView}
            sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        >
            <DialogContent 
                className='view-category-container'
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
                
                <Typography variant="h6" sx={{marginTop: 3 }}>
                    {activeAttribute?.attributeName}
                </Typography>
                <Typography variant="h6" sx={{marginTop: 3 }}>
                    {activeAttribute?.attributeName}
                </Typography>
            </DialogContent>
            
        </Dialog>
    );
}
