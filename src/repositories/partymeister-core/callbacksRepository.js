import baseRepository from '@/repositories/baseRepository';
import CallbackService from '@/services/partymeister-core/CallbackService';
import {onMounted} from "vue";

export default function callbackRepository(mounted = false) {

    const service = new CallbackService();

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
    } = baseRepository(service, 'partymeister-core.callbacks')

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