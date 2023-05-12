import { TextField as MuiTextField } from '@material-ui/core';
import { useState } from 'react';
import {
    useUpdate,
    useNotify,
    FunctionField,
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
} from 'react-admin'
import { useParams } from 'react-router-dom';
import { translateReviewType } from './utils/functions';

const ReviewTypeTitle = () => {
    const record = useRecordContext();
    if(!record) return null;
    return <span>Mot de passe {translateReviewType(record.type)}</span>;
}

export function ReviewTypeList() {
    return (
        <List title="Mots de passe : Formulaires d'avis">
            <Datagrid bulkActionButtons={false}>
                <FunctionField render={record => translateReviewType(record.type)} label='Formulaire'/>
                <DateField source='updatedAt' label='Dernière modification' options={{hour: "numeric", minute: "numeric"}}/>
                <EditButton />
            </Datagrid>
        </List>
    );
}

export const ReviewTypeEdit = () => {
    const { id } = useParams();
    const { data } = useGetOne('reviewType', { id });
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
            'reviewType',
            { id, data: {...data, password: input.password} },
            {
                onSuccess: () => {
                    redirect('/admin/reviewType');
                    notify('Mot de passe modifié !')
                },
                onError: (error) => {
                    notify(`Echec de la tentative: ${error.message}`, { type: 'error' });
                },
            }
        )
    }

    return (
        <Edit title={<ReviewTypeTitle />}>
            <SimpleForm toolbar={<PasswordToolbar />} onSubmit={handleSubmit} validate={validatePassword}>
                <MuiTextField required label='Nouveau mot de passe' type='password' onChange={handleChange} value={input.password} name='password' />
                <MuiTextField required label='Confirmer le mot de passe' type='password' onChange={handleChange} value={input.confirmation} name='confirmation' />
            </SimpleForm>
        </Edit>
    );
};
