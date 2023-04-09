import { Modal, Box, Typography, Dialog, DialogContent } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import { useCategoriesStore, useUiStore } from '../../../hooks';

export const CategoryView = () => {
    const { closeModalView, isModalViewOpen } = useUiStore();
    const { activeCategory } = useCategoriesStore();

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
                <img className='view-category-image' src={activeCategory?.image?.url} alt="" />
                <img className='view-category-icon' src={activeCategory?.icon?.url} alt="" />
                <Typography variant="h6" sx={{marginTop: 3 }}>
                    {activeCategory?.categoryName}
                </Typography>
            </DialogContent>
        </Dialog>
    );
}