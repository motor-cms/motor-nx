import axios from 'axios'
import baseGrid from '@/grids/baseGrid'
import modelRepository from '@/api/motor-backend/configVariable'

export default function configVariableGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
        repository,
        'motor-backend.config_variables'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
