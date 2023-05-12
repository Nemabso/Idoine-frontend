import { TextField as MuiTextField } from '@material-ui/core';
import { useState } from 'react';
import {
    useUpdate,
    useNotify,
    useGetOne,
    useRedirect,
    SimpleForm,
    Toolbar,
    SaveButton
} from 'react-admin'
import { useParams } from 'react-router-dom';

export default function PasswordForm({resource}) {
    const { id } = useParams();
    const { data } = useGetOne(resource, { id });
    const redirect = useRedirect();
    const notify = useNotify();
    const [update] = useUpdate();

    const PasswordToolbar = () => (
        <Toolbar>
            <SaveButton alwaysEnable={validatePassword()} />
        </Toolbar>
    );

    const [input, setInput] = useState({password: "", confirmation: ""})
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setInput({...input, [name]: value });
    };

    function validatePassword() {
        return input.password !== '' && input.password === input.confirmation;
    }

    const handleSubmit = () => {
        update(
            resource,
            { id, data: {...data, password: input.password} },
            {
                onSuccess: () => {
                    redirect(`/admin/${resource}`);
                    notify('Mot de passe modifié !')
                },
                onError: (error) => {
                    notify(`Echec de la tentative: ${error.message}`, { type: 'error' });
                },
            }
        )
    }

    return (
        <SimpleForm toolbar={<PasswordToolbar />} onSubmit={handleSubmit} validate={validatePassword}>
            <MuiTextField required label='Nouveau mot de passe' type='password' onChange={handleChange} value={input.password} name='password' />
            <MuiTextField required label='Confirmer le mot de passe' type='password' onChange={handleChange} value={input.confirmation} name='confirmation' />
        </SimpleForm>
    );
}
