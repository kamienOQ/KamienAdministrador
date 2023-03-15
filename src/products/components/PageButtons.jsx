import { Grid, Typography } from "@mui/material";
import { useUiStore } from "../../hooks";

export const PageButtons = () => {

    const { totalPages, page, changePage } = useUiStore();
    let buttons = [];

    const onHandlePage = ({ target }) => {
        changePage(parseInt(target.value));
    }

    for (let i = 0; i < totalPages; i++) {
        if (page <= 5) {
            //TODO: Pasar la clase dinamica para el background-color
            buttons.push(<button 
                            className={ page === i + 1 ? 'page-button-selected' : 'page-button'  } 
                            onClick={onHandlePage} 
                            key={i + 1}
                            value={i + 1}
                        >
                            {i + 1}
                        </button>);
        }
        else{
            buttons = []
            buttons.push(<Typography key={i + 1}>...</Typography>)
        }
    }

    return (
        <Grid item>{buttons}</Grid>
    )
}
