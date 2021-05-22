import axios from 'axios'
import baseGrid from '@/grids/baseGrid'
import modelRepository from '@/api/motor-backend/client'

export default function clientGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
        repository,
        'motor-backend.clients'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
