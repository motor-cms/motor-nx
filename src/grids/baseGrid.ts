import Repository from '@/types/repository'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

export default function callbackGrid(
  repository: Repository,
  languagePrefix: string
) {
  const toast = useToast()

  const { t } = useI18n()

  const rows = ref([])
  const meta = ref({ current_page: 1, from: 1, to: 1 })

  repository.index({}).then((result) => {
    rows.value = result.data.data
    meta.value = result.data.meta
  })

  const refreshRecords = async (params: {}) => {
    repository.index(params).then((result) => {
      rows.value = result.data.data
      meta.value = result.data.meta
    })
  }

  const handleCellEvent = async (params: {
    filterValues: any
    componentParams: any
  }) => {
    switch (params.componentParams.component) {
      case 'DeleteButton':
        // Delete the record
        await repository.delete(params.componentParams.record)

        toast.success(t(languagePrefix + '.deleted'))

        await refreshRecords(params.filterValues)
        break
      default:
        console.log('UNHANDLED EVENT', params.componentParams)
    }
  }
  return { rows, meta, refreshRecords, handleCellEvent }
}
