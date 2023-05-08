import { Modal, Box, Typography, Dialog, DialogContent, Container } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import { useCategoriesStore, useUiStore } from '../../../hooks';

export const CategoryView = () => {
    // const { closeModalView, isModalViewOpen } = useUiStore();
    const { closeModalViewCategory, isModalViewOpen } = useUiStore();
    const { activeCategory } = useCategoriesStore();

    return (
        <Dialog
            className="modal-container-categories"
            open={isModalViewOpen}
            onClose={closeModalViewCategory}
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
                
            </DialogContent>
            <DialogContent className='container-view-category-icon'>
                <DialogContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', gap: 0.1}}>
                    <img className='view-category-icon' src={activeCategory?.icon?.url} alt="" />
                    <Typography className='contrast-text' variant="h6" sx={{color: "tertiary.main"}}>
                        {activeCategory?.categoryName}
                    </Typography> 
                </DialogContent>
            </DialogContent>
        </Dialog>
    );
}
