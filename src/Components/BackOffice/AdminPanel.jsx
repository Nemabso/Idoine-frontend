import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import config from '../../config';

export default function AdminPanel() {
    return (
        <Admin dataProvider={restProvider(config.apiBaseUrl)}>
        </Admin>
    );
};