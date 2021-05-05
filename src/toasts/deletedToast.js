import {createToast} from "mosha-vue-toastify";

export default function createdToast(languageFilePrefix, t) {
    createToast(t(languageFilePrefix + '.deleted'),
        {
            toastBackgroundColor: 'rgb(16, 185, 129)',
            timeout: 2000,
            type: 'success',
            showIcon: true,
        });
}