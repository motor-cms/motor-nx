import callbackRepository from "../repositories/partymeister-core/callbacksRepository";
import recordNotFoundToast from "../toasts/recordNotFoundToast";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {useForm} from "vee-validate";
import updatedToast from "../toasts/updatedToast";
import createdToast from "../toasts/deletedToast";
import errorToast from "../toasts/errorToast";

export default function baseForm(languageFilePrefix, routePrefix, repository, model, schema, sanitizer = null) {

    // Load i18n module
    const {t} = useI18n();

    // Load router
    const router = useRouter();

    // Load repository
    const {getRecord, createRecord, updateRecord} = repository();

    // Get record from id and set values. Redirect back and show error if record was not found
    const getData = async (id) => {
        const response = await getRecord(id);
        if (response.status === 200) {
            model.value = response.data.data;
        } else {
            recordNotFoundToast(t);
            router.replace({name: languageFilePrefix + '.index'})
            return null;
        }
    }

    // Initialize form with default values and the validation schema
    const {handleSubmit} = useForm({
        initialValues: model, validationSchema: schema
    });

    const onSubmit = handleSubmit(async values => {

        for (const [key, value] of Object.entries(values)) {
            model.value[key] = value;
        }

        if (sanitizer !== null) {
            sanitizer();
        }

        let response;
        if (model.value.id) {
            response = await updateRecord(model.value.id, model.value);
        } else {
            response = await createRecord(model.value);
        }
        switch (response.status) {
            case 200:
                updatedToast(languageFilePrefix, t);
                await router.replace({name: routePrefix + '.index'})
                break;
            case 201:
                createdToast(languageFilePrefix, t);
                await router.replace({name: routePrefix + '.index'})
                break;
            default:
                errorToast('global.error_occurred', t)
                break;
        }
    });

    return {
        getData,
        onSubmit
    }

}
