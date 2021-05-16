import axios from 'axios'
import baseForm from '@/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import eventTypeRepository from '@/api/partymeister-core/eventTypes'

export default function eventTypeForm() {
  // Validation schema
  const schema = yup.object().shape({
    name: yup.string().required(),
  })

  // Record
  const model = ref({
    id: 0,
    name: '',
    web_color: '#000000',
    slide_color: '#000000',
  })

  const { getData, onSubmit } = baseForm(
    'partymeister-core.event_types',
    'admin.partymeister-core.event-types',
    eventTypeRepository(axios),
    model,
    schema
  )

  return {
    getData,
    onSubmit,
    model,
  }
}
