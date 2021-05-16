import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import Repository from '@/types/repository'
import Ref from '@/types/model'
import ObjectSchema from 'yup/lib/object'

export default function baseForm(
  languageFilePrefix: string,
  routePrefix: string,
  repository: Repository,
  model: Ref<{ [index: string]: any }>,
  schema: ObjectSchema<{}>,
  sanitizer: () => void = () => {}
) {
  // Load i18n module
  const { t } = useI18n()

  // Load router
  const router = useRouter()

  const toast = useToast()

  // Get record from id and set values. Redirect back and show error if record was not found
  const getData = async (id: number | string) => {
    const response = await (<any>(
      repository.get(<number>id).catch((e: Error) => {
        toast.error(t('global.record_not_found'))
        router.replace({ name: routePrefix })
      })
    ))
    model.value = response.data.data
  }

  // Initialize form with default values and the validation schema
  const { handleSubmit } = useForm({
    initialValues: model,
    validationSchema: schema,
  })

  const onSubmit = handleSubmit(async (values) => {
    for (const [key, value] of Object.entries(values)) {
      if (key !== 'id') {
        model.value[key] = value
      }
    }

    if (sanitizer !== null) {
      sanitizer()
    }

    let response
    if (model.value.id) {
      response = await repository.update(model.value, model.value.id)
    } else {
      model.value.id = null
      response = await repository.create(model.value)
    }
    switch (response.status) {
      case 200:
        toast.success(t(languageFilePrefix + '.updated'))
        await router.replace({ name: routePrefix })
        break
      case 201:
        toast.success(t(languageFilePrefix + '.created'))
        await router.replace({ name: routePrefix })
        break
      default:
        toast.error(t('global.error_occurred'))
        break
    }
  })

  return {
    getData,
    onSubmit,
  }
}
