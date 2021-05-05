import axios from "axios";

export default class AuthService {

    private authenticated: boolean = false;

    public async login(email: string, password: string) {
        await axios.get('/sanctum/csrf-cookie')
        return axios.post('/api/auth/login', {
            email: email,
            password: password
        }).then(response => {
            localStorage.setItem('token', response.data.data.token);
            this.authenticated = true;
            return response;
        }).catch(error => {
            return error.response.status;
        });
        // return 404;
    }

    public isAuthenticated() {
        return this.authenticated;
    }

    public async me() {
        return await axios.get('/api/me', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(response => {
            return response;
        }).catch(error => {
            return error.response.status;
        });
    }
}