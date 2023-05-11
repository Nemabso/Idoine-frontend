import config from '../../../config';
import axios from 'axios';
const apiUrl = config.apiBaseUrl;

export const authProvider = {
    // called when the user attempts to log in
    login: async ({ username, password }) => {
        const jwt = await axios.post(`${apiUrl}/user/login`, {login: username, password: password}).then(res => res.data);
        sessionStorage.setItem("jwt", jwt);
        return Promise.resolve();
    },

    // called when the user clicks on the logout button
    logout: () => {
        sessionStorage.removeItem("jwt");
        return Promise.resolve();
    },

    // called when the API returns an error
    checkError: ({status}) => {
        if (status === 401 || status === 403) {
            sessionStorage.removeItem("jwt");
            return Promise.reject();
        }
        return Promise.resolve();
    },

    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return sessionStorage.getItem("jwt")
            ? Promise.resolve()
            : Promise.reject();
    },

    // called when the user navigates to a new location, to check for permissions / roles
    // method taken from react-admin documentation : no permission management at the moment
    getPermissions: () => Promise.resolve(),
  };