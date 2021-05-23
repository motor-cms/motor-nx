import axios from 'axios'
import baseForm from '@/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '@/api/motor-backend/category'

export default function categoryForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = yup.object().shape({
    name: yup.string().required(),
  })

  // Record
  const model = ref({
    id: 0,
    name: '',
  })

  // Sanitize dates
  const sanitizer = () => {}

  const getData = (id: string) => {}

  // const { getData, onSubmit } = baseForm(
  //   'motor-backend.categories',
  //   'admin.motor-backend.categories',
  //   modelRepository(axios),
  //   model,
  //   schema,
  //   sanitizer
  // )

  return {
    getData,
    // onSubmit,
    model,
  }
}
