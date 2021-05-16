import axios from 'axios'
import baseForm from '@/forms/baseForm'
import * as yup from 'yup'
import { computed, ref } from 'vue'
import moment from 'moment'
import { useI18n } from 'vue-i18n'
import callbackRepository from '@/api/partymeister-core/callbacks'

export default function callbackForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = yup.object().shape({
    name: yup.string().required(),
    title: yup.string().required(),
    action: yup.string().required(),
    destination: yup.string().required(),
  })

  // Record
  const model = ref({
    id: 0,
    name: '',
    action: 'notification',
    destination: 'orga',
    title: '',
    link: '',
    body: '',
    is_timed: false,
    has_fired: false,
    embargo_until: '',
    fired_at: '', // new moment().format('YYYY-MM-DDTHH:mm:ss'),
    hash: '',
    payload: '',
  })

  // Sanitize dates
  const sanitizer = () => {
    model.value.fired_at = moment(model.value.fired_at).isValid()
      ? moment(model.value.fired_at).format('YYYY-MM-DDTHH:mm:ss')
      : null
    model.value.embargo_until = moment(model.value.embargo_until).isValid()
      ? moment(model.value.embargo_until).format('YYYY-MM-DDTHH:mm:ss')
      : null
  }

  // Get options from language string
  const actions = computed(() => {
    const options = <any>[]
    Object.entries(tm('partymeister-core.callbacks.actions')).forEach(
      (value) => {
        options.push({
          name: t('partymeister-core.callbacks.actions.' + value[0]),
          value: value[0],
        })
      }
    )
    return options
  })

  // Get options from language string
  const destinations = computed(() => {
    const options = <any>[]
    Object.entries(tm('partymeister-core.callbacks.destinations')).forEach(
      (value) => {
        options.push({
          name: t('partymeister-core.callbacks.destinations.' + value[0]),
          value: value[0],
        })
      }
    )
    return options
  })

  const { getData, onSubmit } = baseForm(
    'partymeister-core.callbacks',
    'admin.partymeister-core.callbacks',
    callbackRepository(axios),
    model,
    schema,
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
    actions,
    destinations,
  }
}
