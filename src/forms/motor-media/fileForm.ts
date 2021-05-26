import axios from 'axios'
import baseForm from '@/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '@/api/motor-media/file'
import categoryTreeRepository from '@/api/motor-backend/categoryTree'

export default function fileForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = yup.object().shape({
    categories: yup.array().required(),
  })

  // Record
  const model = ref({
    id: 0,
    description: '',
    author: '',
    source: '',
    alt_text: '',
    categories: [],
    file: <any>{},
  })

  // Sanitize dates
  const sanitizer = async (formData: any) => {
    // Find start of base64 string
    if (formData.file.file) {
      const startBase64 = formData.file.file.indexOf(',') + 1
      formData.file = formData.file.file.substring(startBase64)
    }
  }

  const { getData, onSubmit } = baseForm(
    'motor-media.files',
    'admin.motor-media.files',
    modelRepository(axios),
    model,
    schema,
    sanitizer
  )

  const treeData = ref({})

  categoryTreeRepository(axios)
    .get(1)
    .then((response: any) => {
      treeData.value = response.data.data
    })

  return {
    getData,
    onSubmit,
    model,
    treeData,
  }
}
