import axios from 'axios'
import { useI18n } from 'vue-i18n'
import eventRepository from '@/api/partymeister-core/events'
import baseGrid from '@/grids/baseGrid'

export default function eventsGrid() {
  // Load i18n module
  const { t } = useI18n()

  const repository = eventRepository(axios)

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'partymeister-core.events'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
