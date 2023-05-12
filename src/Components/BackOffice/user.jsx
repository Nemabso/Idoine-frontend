import {
    TextField,
    List,
    Datagrid,
    DateField,
    EditButton,
    Edit,
    useRecordContext,
} from 'react-admin';
import PasswordForm from './PasswordForm';

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
    return (
        <Edit title={<UserEditTitle />}>
            <PasswordForm resource='user' />
        </Edit>
    );
};
