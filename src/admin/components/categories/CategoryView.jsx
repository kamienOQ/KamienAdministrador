<<<<<<< HEAD
import { Modal, Box, Typography, Dialog, DialogContent, Container } from '@mui/material';
=======
import { Modal, Box, Typography, Dialog, DialogContent } from '@mui/material';
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
// import { makeStyles } from '@mui/styles';
import { useCategoriesStore, useUiStore } from '../../../hooks';

export const CategoryView = () => {
<<<<<<< HEAD
    const { closeModalView, isModalViewOpen } = useUiStore();
=======
    const { openModalViewCategory, isModalViewOpenCategory } = useUiStore();
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
    const { activeCategory } = useCategoriesStore();

    return (
        <Dialog
            className="modal-container-categories"
<<<<<<< HEAD
            open={isModalViewOpen}
            onClose={closeModalView}
=======
            open={isModalViewOpenCategory}
            onClose={openModalViewCategory}
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
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
<<<<<<< HEAD
                
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
=======
                <Typography variant="h6" sx={{marginTop: 3 }}>
                    {activeCategory?.categoryName}
                </Typography>
            </DialogContent>
            <img className='view-category-icon' src={activeCategory?.icon?.url} alt="" />
        </Dialog>
    );
}
>>>>>>> f92577c5bbc5e2139da1eeafc7fa9cdfe30e6e77
