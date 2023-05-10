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
            {/* <DialogContent 
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
            </DialogContent> */}
            <div className='container-categoriesCards'>
                <figure className='container-figure-img'>
                    <img src={activeCategory?.image?.url} alt="" className='categoriesCards-img'/>
                </figure>
                <div className='main-container-categoriesCards-icon'>
                    <div className='info-container-categoriesCards'>
                        <div className='container-categoriesCards-icon'>
                            <div className='container-categoriesCards-content'>
                                <figure className='container-figure-icon'>
                                    <img src={activeCategory?.icon?.url} alt="" className='categoriesCards-icon' />
                                </figure>
                                <h2 className='categoriesCards-text'>{activeCategory?.categoryName}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
