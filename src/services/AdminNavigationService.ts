import axios from "axios";

export default class AdminNavigationService {

    public async getNavigationItems() {
        return axios.get('/api/admin_navigations', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(response => {
            return response.data;
        }).catch(error => {
            return error.response.status;
        });
    }
}