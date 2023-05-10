import { i18nProvider } from '../../utils/backoffice/i18nProvider';
import dataProvider from '../../utils/backoffice/dataProvider';
import { Admin, Resource } from 'react-admin';
import {ReviewTypeEdit, ReviewTypeList} from './reviewType';


export default function AdminPanel() {
    return (
        <Admin 
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
            basename='/admin'
        >
            <Resource 
                name='reviewType' 
                list={ReviewTypeList} 
                options={{label: "Mots de passe avis"}} 
                edit={ReviewTypeEdit} 
            />
        </Admin>
    );
};