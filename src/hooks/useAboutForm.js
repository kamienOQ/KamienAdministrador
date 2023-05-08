import { useEffect, useState } from "react";

export const  useAboutForm = ( initialForm = {}  ) => {
    const [ formState, setFormState ] = useState( initialForm );

    const [count, setCount] = useState(0)
//description, instagram, name, whatsapp
    useEffect(() => {
        if(count === 0 && (formState.description !== initialForm.description || formState.instagram !== initialForm.instagram ||
            formState.name !== initialForm.name|| formState.whatsapp !== initialForm.whatsapp)){
            setFormState( initialForm );
            setCount(count+1)
        }
    }, [initialForm])

    const onInputChange = ({ target }) => {
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