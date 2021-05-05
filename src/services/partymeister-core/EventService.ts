// @ts-nocheck
import axios from "axios";

export default class EventService {

    private config: {};

    public constructor() {
        this.config = {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}};
    }

    public async getRecords(params: Object = {}) {
        const query = Object.keys(params).reduce(function (a, k) {
            a.push(k + '=' + params[k].toString());
            return a
        }, []).join('&')

        return axios.get('/api/events?' + query, this.config).then(response => {
            return response.data;
        }).catch(error => {
            return error.response.status;
        });
    }

    public async postRecord(record: object) {
        return axios.post('/api/events/', record, this.config).then(response => {
            return response;
        }).catch(error => {
            return error.response.status;
        });
    }

    public async patchRecord(id, record: object) {
        return axios.patch('/api/events/'+ id, record, this.config).then(response => {
            return response;
        }).catch(error => {
            return error.response.status;
        });
    }

    public async deleteRecord(record: Number) {
        return axios.delete('/api/events/'+record, config).then(response => {
            return response.data;
        }).catch(error => {
            return error.response.status;
        });
    }

    public async getRecord(id) {
        return axios.get('/api/events/'+id, this.config).then(response => {
            return response;
        }).catch(error => {
            return error.response.status;
        });
    }
}