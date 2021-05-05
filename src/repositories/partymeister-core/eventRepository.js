import baseRepository from '@/repositories/baseRepository';
import {onMounted} from "vue";
import EventService from "../../services/partymeister-core/EventService";

export default function eventRepository(mounted = false) {

    const service = new EventService();

    const {
        params,
        rows,
        meta,
        refreshRecords,
        handleCellEvent,
        deleteRecord,
        getRecords,
        createRecord,
        updateRecord,
        getRecord,
    } = baseRepository(service, 'partymeister-core.events')

    if (mounted) {
        onMounted(getRecords);
    }

    return {
        params,
        rows,
        meta,
        refreshRecords,
        handleCellEvent,
        deleteRecord,
        createRecord,
        updateRecord,
        getRecord,
    }
}