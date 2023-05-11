import { useState } from 'react';
import {  } from 'react-admin';
import {
    TextField,
    useUpdate,
    useNotify,
    useGetOne,
    useRedirect,
    List,
    Datagrid,
    DateField,
    EditButton,
    SimpleForm,
    Edit,
    Toolbar,
    useRecordContext,
    SaveButton
} from 'react-admin';
import { TextField as MuiTextField } from '@material-ui/core';
import { useParams } from 'react-router-dom';

export function UserList() {
    return (
        <List title="Comptes administrateur">
            <Datagrid bulkActionButtons={false}>
                <TextField source='login' label='Identifiant' />
                <DateField source='updatedAt' label='Dernière modification' options={{hour: "numeric", minute: "numeric"}}/>
                <EditButton />
            </Datagrid>
        </List>
    );
}

const UserEditTitle = () => {
    const record = useRecordContext();
    if(!record) return null;
    return <span>Mot de passe de l'utilisateur : {record.login}</span>;
}

export const UserEdit = () => {
    const { id } = useParams();
    const { data } = useGetOne('user', { id });
    const redirect = useRedirect();
    const notify = useNotify();
    const [update] = useUpdate();

    const PasswordToolbar = (props) => (
        <Toolbar {...props}>
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
            'user',
            { id, data: {...data, password: input.password} },
            {
                onSuccess: () => {
                    redirect('/admin/user');
                    notify('Mot de passe modifié !')
                },
                onError: (error) => {
                    notify(`Echec de la tentative: ${error.message}`, { type: 'error' });
                },
            }
        )
    }

    return (
        <Edit title={<UserEditTitle />}>
            <SimpleForm toolbar={<PasswordToolbar />} onSubmit={handleSubmit} validate={validatePassword}>
                <MuiTextField required label='Nouveau mot de passe' type='password' onChange={handleChange} value={input.password} name='password' />
                <MuiTextField required label='Confirmer le mot de passe' type='password' onChange={handleChange} value={input.confirmation} name='confirmation' />
            </SimpleForm>
        </Edit>
    );
};
