import {createToast} from "mosha-vue-toastify";

export default function deletedToast(languageFilePrefix, t) {
    createToast(t(languageFilePrefix + '.create'),
        {
            toastBackgroundColor: 'rgb(16, 185, 129)',
            timeout: 2000,
            type: 'success',
            showIcon: true,
        });
}