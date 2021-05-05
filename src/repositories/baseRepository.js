import {computed, ref} from 'vue'
import deletedToast from "@/toasts/deletedToast";
import {useI18n} from "vue-i18n";

export default function baseRepository(dataService, languageFilePrefix) {

    const {t} = useI18n();

    const records = ref([]);

    const getRecords = async (params = {}) => {
        records.value = await dataService.getRecords(params)
    }

    const getRecord = async (id) => {
        return await dataService.getRecord(id)
    }

    const deleteRecord = async (id) => {
        return await dataService.deleteRecord(id);
    }

    const createRecord = async (data) => {
        return await dataService.postRecord(data);
    }

    const updateRecord = async (id, data) => {
        return await dataService.patchRecord(id, data);
    }

    const rows = computed(() => {
        return (records.value.data) ? records.value.data : [];
    });

    const meta = computed(() => {
        return records.value.meta ? records.value.meta : {};
    });

    let params = ref({});

    const refreshRecords = (parameters) => {
        console.log("Refresher", parameters);
        getRecords(parameters);

        // FIXME: no longer needed?
        // params.value = parameters;
    };

    // FIXME: No longer needed?
    // watch(() => _.cloneDeep(params.value), (currentValue) => {
    //     console.log("Watcher", currentValue);
    //         getRecords(currentValue);
    //     }
    // );

    const handleCellEvent = async (parameters) => {
        switch (parameters.componentParams.component) {
            case 'DeleteButton':
                // Delete the record
                await deleteRecord(parameters.componentParams.record);

                // Show success toast
                deletedToast(languageFilePrefix, t);

                // This watched property will automatically fetch the records again
                refreshRecords(parameters.filterValues);
                // FIXME: no longer needed?
                // params.value = parameters.filterValues;
                break
            default:
                console.log('UNHANDLED EVENT', parameters.componentParams);
        }
    };

    return {
        rows,
        meta,
        records,
        params,
        refreshRecords,
        handleCellEvent,
        deleteRecord,
        createRecord,
        updateRecord,
        getRecords,
        getRecord,
    }
}