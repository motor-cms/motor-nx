import axios from 'axios'
import baseGrid from '@/grids/baseGrid'
import modelRepository from '@/api/motor-media/file'

export default function fileGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
        repository,
        'motor-media.files'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
