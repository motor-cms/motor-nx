import baseRepository from '@/repositories/baseRepository';
import {onMounted} from "vue";
import EventTypeService from "../../services/partymeister-core/EventTypeService";

export default function eventTypeRepository(mounted = false) {

    const service = new EventTypeService();

    const {
        params,
        rows,
        meta,
        refreshRecords,
        handleCellEvent,
        deleteRecord,
        getRecords,
        records,
    } = baseRepository(service, 'partymeister-core.event_types')

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
        records,
        getRecords,
    }
}