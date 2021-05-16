import axios from 'axios'
import { useI18n } from 'vue-i18n'
import callbackRepository from '@/api/partymeister-core/callbacks'
import baseGrid from '@/grids/baseGrid'

export default function callbackGrid() {
  // Load i18n module
  const { t } = useI18n()

  const repository = callbackRepository(axios)

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'partymeister-core.callbacks'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
