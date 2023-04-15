import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onChangePreCategoryUpdated } from "../store";

export const  useAttributesForm = ( initialForm = {}  ) => {
    const [ formState, setFormState ] = useState( initialForm );
    const dispatch = useDispatch();

    useEffect(() => {
        setFormState( initialForm )
      }, [initialForm])

    const onInputChange = ({ target }) => {
        dispatch(onChangePreCategoryUpdated(true));
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}
