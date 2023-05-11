import { i18nProvider } from './utils/i18nProvider';
import dataProvider from './utils/dataProvider';
import { Admin, Resource } from 'react-admin';
import {ReviewTypeEdit, ReviewTypeList} from './reviewType';
import {UserEdit, UserList} from './user';
import { authProvider } from './utils/authProvider';


export default function AdminPanel() {
    return (
        <Admin 
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
            authProvider={authProvider}
            basename='/admin'
        >
            <Resource 
                name='reviewType' 
                list={ReviewTypeList} 
                options={{label: "Mots de passe avis"}} 
                edit={ReviewTypeEdit} 
            />
            <Resource 
                name='user' 
                list={UserList} 
                options={{label: "Comptes administrateur"}} 
                edit={UserEdit} 
            />
        </Admin>
    );
};