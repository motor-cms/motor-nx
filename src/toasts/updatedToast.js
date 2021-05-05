import {createToast} from "mosha-vue-toastify";

export default function updatedToast(languageFilePrefix, t) {
    createToast(t(languageFilePrefix + '.updated'),
        {
            toastBackgroundColor: 'rgb(16, 185, 129)',
            timeout: 2000,
            type: 'success',
            showIcon: true,
        });
}