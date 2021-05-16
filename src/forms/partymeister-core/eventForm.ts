import axios from 'axios'
import baseForm from '@/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import moment from 'moment'
import eventRespository from '@/api/partymeister-core/events'
import Repository from '@/types/repository'
import scheduleRepository from '@/api/partymeister-core/schedules'
import eventTypeRepository from '@/api/partymeister-core/eventTypes'

export default function eventForm() {
  // Validation schema
  const schema = yup.object().shape({
    name: yup.string().required(),
    schedule_id: yup.string().required().nullable(),
    event_type_id: yup.string().required().nullable(),
    starts_at: yup.string().required(),
  })

  // Record
  const model = ref({
    id: 0,
    name: '',
    schedule_id: null,
    event_type_id: null,
    starts_at: '',
    ends_at: '',
    is_visible: false,
    is_organizer_only: false,
    sort_position: 0,
    notify_minutes: 0, // new moment().format('YYYY-MM-DDTHH:mm:ss'),
    link: '',
  })

  // Sanitize dates
  const sanitizer = () => {
    model.value.starts_at = moment(model.value.starts_at).isValid()
      ? moment(model.value.starts_at).format('YYYY-MM-DDTHH:mm:ss')
      : null
    model.value.ends_at = moment(model.value.ends_at).isValid()
      ? moment(model.value.ends_at).format('YYYY-MM-DDTHH:mm:ss')
      : null
  }

  // Get schedules from api
  const schedules = ref([])
  const scheduleRepo: Repository = scheduleRepository(axios)
  scheduleRepo.index({}).then((response) => {
    const options = []
    for (let i = 0; i < response.data.data.length; i++) {
      options.push({
        name: response.data.data[i].name,
        value: response.data.data[i].id,
      })
    }
    schedules.value = options
  })

  // Get event types from api
  const eventTypes = ref([])
  const repository: Repository = eventTypeRepository(axios)
  repository.index({}).then((response) => {
    const options = []
    for (let i = 0; i < response.data.data.length; i++) {
      options.push({
        name: response.data.data[i].name,
        value: response.data.data[i].id,
      })
    }
    eventTypes.value = options
  })

  const { getData, onSubmit } = baseForm(
    'partymeister-core.events',
    'admin.partymeister-core.events',
    eventRespository(axios),
    model,
    schema,
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
    schedules,
    eventTypes,
  }
}
