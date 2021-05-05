import {createToast} from "mosha-vue-toastify";

export default function errorToast(languageString, t) {
    createToast(t(languageString),
        {
            toastBackgroundColor: 'rgb(239, 68, 68)',
            timeout: 2000,
            type: 'error',
            showIcon: true,
        });
}