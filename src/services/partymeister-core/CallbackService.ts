// @ts-nocheck
import axios from "axios";

export default class CallbackService {

    private config: {};

    public constructor() {
        this.config = {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}};
    }

    public async getRecords(params: Object = {}) {
        const query = Object.keys(params).reduce(function (a, k) {
            a.push(k + '=' + params[k].toString());
            return a
        }, []).join('&')

        return axios.get('/api/callbacks?' + query, this.config).then(response => {
            return response.data;
        }).catch(error => {
            return error.response.status;
        });
    }

    public async postRecord(record: object) {
        return axios.post('/api/callbacks/', record, this.config).then(response => {
            return response;
        }).catch(error => {
            return error.response.status;
        });
    }

    public async patchRecord(id, record: object) {
        return axios.patch('/api/callbacks/'+ id, record, this.config).then(response => {
            return response;
        }).catch(error => {
            return error.response.status;
        });
    }

    public async getRecord(id) {
        return axios.get('/api/callbacks/'+id, this.config).then(response => {
            return response;
        }).catch(error => {
            return error.response.status;
        });
    }

    public async deleteRecord(record: Number) {
        return axios.delete('/api/callbacks/'+record, this.config).then(response => {
            return response.data;
        }).catch(error => {
            return error.response.status;
        });
    }
}