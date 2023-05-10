import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { SaveButton } from 'react-admin';
import { Toolbar } from 'react-admin';
import { useRecordContext } from 'react-admin';
import { List, Datagrid, DateField, EditButton, SimpleForm, Edit } from 'react-admin'
import TranslatedReviewType from './CustomFields/TranslatedReviewType';

export function ReviewTypeList() {
    return (
        <List title="Mots de passe : Formulaires d'avis">
            <Datagrid bulkActionButtons={false}>
                <TranslatedReviewType source='type' />
                <DateField source='updatedAt' />
                <EditButton />
            </Datagrid>
        </List>
    );
}

export const ReviewTypeEdit = () => {
    const PasswordToolbar = (props) => (
        <Toolbar {...props}>
            <SaveButton />
        </Toolbar>
    );

    const [input, setInput] = useState({password: "", confirmation: ""})
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setInput({...input, [name]: value });
    };

    return (
        <Edit>
            <SimpleForm toolbar={<PasswordToolbar />}>
                <TextField required label='Nouveau mot de passe' type='password' onChange={handleChange} value={input.password} name='password' />
                <TextField required label='Confirmer le mot de passe' type='password' onChange={handleChange} value={input.confirmation} name='confirmation' />
            </SimpleForm>
        </Edit>
    )
};
