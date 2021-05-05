// @ts-nocheck
import axios from "axios";

export default class EventTypeService {

    public async getRecords(params: Object = {}) {
        const query = Object.keys(params).reduce(function (a, k) {
            a.push(k + '=' + params[k].toString());
            return a
        }, []).join('&')

        return axios.get('/api/event_types?' + query, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(response => {
            return response.data;
        }).catch(error => {
            return error.response.status;
        });
    }

    public async deleteRecord(record: Number) {
        return axios.delete('/api/event_types/'+record, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(response => {
            return response.data;
        }).catch(error => {
            return error.response.status;
        });
    }
}