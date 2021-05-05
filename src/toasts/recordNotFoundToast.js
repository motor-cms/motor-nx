import {createToast} from "mosha-vue-toastify";

export default function recordNotFoundToast(t) {
    createToast(t('global.record_not_found'),
        {
            toastBackgroundColor: 'rgb(239, 68, 68)',
            timeout: 2000,
            type: 'error',
            showIcon: true,
        });
}