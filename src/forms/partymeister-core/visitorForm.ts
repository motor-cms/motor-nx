import axios from 'axios'
import baseForm from '@/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import repository from '@/api/partymeister-core/visitors'
import { countries } from 'countries-list'
export default function visitorForm() {
  // Validation schema
  const schema = yup.object().shape({
    name: yup.string().required(),
    country_iso_3166_1: yup.string().required(),
  })

  const options = []
  for (const [key, value] of Object.entries(countries)) {
    options.push({ label: value.emoji + ' ' + value.name, value: key })
  }

  // Record
  const model = ref({
    id: 0,
    name: '',
    group: '',
    country_iso_3166_1: '',
    email: '',
    password: '',
    additional_data: null,
  })

  const { getData, onSubmit } = baseForm(
    'partymeister-core.visitors',
    'admin.partymeister-core.visitors',
    repository(axios),
    model,
    schema
  )

  return {
    getData,
    onSubmit,
    model,
    options,
  }
}
