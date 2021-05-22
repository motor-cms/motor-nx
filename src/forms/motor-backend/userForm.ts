import axios from 'axios'
import baseForm from '@/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '@/api/motor-backend/user'
import useAuth from '@/compositions/authentication/useAuth'
import { useStore } from 'vuex'

export default function userForm() {
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
    avatar: <any>{},
  })

  // Sanitize dates
  const sanitizer = async (formData: any) => {
    // Find start of base64 string
    if (formData.avatar.file) {
      const startBase64 = formData.avatar.file.indexOf(',') + 1
      formData.avatar = formData.avatar.file.substring(startBase64)
    }
  }

  const store = useStore()

  const afterSubmit = async () => {
    // FIXME: only update user if the currently logged in user was updated
    await axios.get('/api/me').then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.data))
      store.commit('motor/setUser', response.data.data)
    })
  }

  const { getData, onSubmit } = baseForm(
    'motor-backend.users',
    'admin.motor-backend.users',
    modelRepository(axios),
    model,
    schema,
    sanitizer,
    afterSubmit
  )

  return {
    getData,
    onSubmit,
    model,
  }
}
