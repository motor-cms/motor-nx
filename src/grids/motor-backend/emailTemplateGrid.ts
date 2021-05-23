import axios from 'axios'
import baseGrid from '@/grids/baseGrid'
import modelRepository from '@/api/motor-backend/emailTemplate'

export default function emailTemplateGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
        repository,
        'motor-backend.email_templates'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
