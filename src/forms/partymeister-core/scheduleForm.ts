import axios from 'axios'
import baseForm from '@/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import repository from '@/api/partymeister-core/schedules'

export default function scheduleForm() {
  // Validation schema
  const schema = yup.object().shape({
    name: yup.string().required(),
  })

  // Record
  const model = ref({
    id: 0,
    name: '',
  })

  const { getData, onSubmit } = baseForm(
    'partymeister-core.schedules',
    'admin.partymeister-core.schedules',
    repository(axios),
    model,
    schema
  )

  return {
    getData,
    onSubmit,
    model,
  }
}
