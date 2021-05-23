import axios from 'axios'
import baseGrid from '@/grids/baseGrid'
import modelRepository from '@/api/motor-backend/language'

export default function languageGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
        repository,
        'motor-backend.languages'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
