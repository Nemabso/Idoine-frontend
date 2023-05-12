import {
    FunctionField,
    List,
    Datagrid,
    DateField,
    EditButton,
    Edit,
    useRecordContext,
} from 'react-admin'
import PasswordForm from './PasswordForm';
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
    return (
        <Edit title={<ReviewTypeTitle />}>
            <PasswordForm resource='reviewType' />
        </Edit>
    );
};
