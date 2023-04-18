import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onChangePreAttributeUpdated } from "../store";
import { onChangePreProductUpdated } from "../store";

export const  useAttributesForm = ( initialForm = {}  ) => {
    const [ formState, setFormState ] = useState( initialForm );
    const dispatch = useDispatch();

    useEffect(() => {
        setFormState( initialForm )
      }, [initialForm])

    const onInputChange = ({ target }) => {
        dispatch(onChangePreAttributeUpdated(true));
        dispatch(onChangePreProductUpdated(true));
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
