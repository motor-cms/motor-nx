import baseForm from "@/forms/baseForm";
import * as yup from "yup";
import {ref} from "vue";
import moment from "moment";
import eventRepository from "@/repositories/partymeister-core/eventRepository";
import EventTypeService from "@/services/partymeister-core/EventTypeService";

export default function eventForm() {

    // Load i18n module
    // const {t, tm} = useI18n();

    // Validation schema
    const schema = yup.object().shape({
        name: yup.string().required(),
        schedule_id: yup.string().required(),
        event_type_id: yup.string().required(),
        starts_at: yup.string().required(),
    });

    // Record
    let model = ref({
        id: 0,
        name: '',
        schedule_id: null,
        event_type_id: null,
        starts_at: '',
        is_visible: false,
        is_organizer_only: false,
        sort_position: 0,
        notify_minutes: 0,
        link: '',
    });

    // Sanitize dates
    const sanitizer = () => {
        model.value.starts_at = moment(model.value.starts_at).isValid() ? moment(model.value.starts_at).format('YYYY-MM-DDTHH:mm:ss') : null;
    }

    const eventTypeService = new EventTypeService();

    let eventTypes = ref([]);

    eventTypeService.getRecords().then(records => {
        let options = [];
        for (let i = 0; i < records.data.length; i++) {
            options.push({name: records.data[i].name, value: records.data[i].id})
        }
        eventTypes.value = options;
    });

    const schedules = [{ name: "Superschedule number one", value: 1}];

    const {
        getData,
        onSubmit
    } = baseForm('partymeister-core.events', 'partymeister-core.events', eventRepository, model, schema, sanitizer);

    return {
        getData,
        onSubmit,
        model,
        eventTypes,
        schedules,
    }
}
