import config from '../../../config';
import axios from 'axios';
import { getAuthHeader } from "./functions";
const apiUrl = config.apiBaseUrl;

const dataProvider = {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        // TODO : implement query parameters in URL
        const url = `${apiUrl}/${resource}`;

        return axios.get(url, getAuthHeader()).then(({ data }) => ({
            data: data.list.map(resource => ({ ...resource, id: resource._id })),
            total: data.total,
        }));
    },

    getOne: (resource, params) =>
        axios.get(`${apiUrl}/${resource}/${params.id}`, getAuthHeader()).then(({ data }) => ({
            data: { ...data, id: data._id},
        })),


    // TODO : method taken from react-admin documentation : to be modified when method is needed
    // getMany: (resource, params) => {
    //     const query = {
    //         filter: JSON.stringify({ id: params.ids }),
    //     };
    //     const url = `${apiUrl}/${resource}?${stringify(query)}`;
    //     return httpClient(url).then(({ json }) => ({ data: json }));
    // },

    // TODO : method taken from react-admin documentation : to be modified when method is needed
    // getManyReference: (resource, params) => {
    //     const { page, perPage } = params.pagination;
    //     const { field, order } = params.sort;
    //     const query = {
    //         sort: JSON.stringify([field, order]),
    //         range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    //         filter: JSON.stringify({
    //             ...params.filter,
    //             [params.target]: params.id,
    //         }),
    //     };
    //     const url = `${apiUrl}/${resource}?${stringify(query)}`;

    //     return httpClient(url).then(({ headers, json }) => ({
    //         data: json,
    //         total: parseInt((headers.get('content-range') || "0").split('/').pop() || 0, 10),
    //     }));
    // },

    update: (resource, params) => 
        axios.put(`${apiUrl}/${resource}/${params.id}`, params.data, getAuthHeader())
            .then(({ data }) => ({ data: {...data, id: data._id}})),
        // httpClient(`${apiUrl}/${resource}/${params.id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(params.data),
        // }).then(({ json }) => ({ data: {...json, id: json._id}})),

    // TODO : method taken from react-admin documentation : to be modified when method is needed
    // updateMany: (resource, params) => {
    //     const query = {
    //         filter: JSON.stringify({ id: params.ids}),
    //     };
    //     return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({ data: json }));
    // },

    // TODO : method taken from react-admin documentation : to be modified when method is needed
    // create: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}`, {
    //         method: 'POST',
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({
    //         data: { ...params.data, id: json.id },
    //     })),

    // TODO : method taken from react-admin documentation : to be modified when method is needed
    // delete: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}/${params.id}`, {
    //         method: 'DELETE',
    //     }).then(({ json }) => ({ data: json })),

    // TODO : method taken from react-admin documentation : to be modified when method is needed
    // deleteMany: (resource, params) => {
    //     const query = {
    //         filter: JSON.stringify({ id: params.ids}),
    //     };
    //     return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
    //         method: 'DELETE',
    //     }).then(({ json }) => ({ data: json }));
    // }
};

export default dataProvider;