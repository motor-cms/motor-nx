<template>
  <AdminCommonGrid
    :name="$t('partymeister-core.events.events')"
    create-route="admin.partymeister-core.events.create"
    :create-label="$t('partymeister-core.events.new')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="callbacks"
    :loadComponents="loadComponents"
    @submit="refreshRecords"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script lang="ts">
import AdminCommonGrid from '@/components/admin/common/Grid.vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import EditButton from '@/components/admin/cell/EditButton.vue'
import DeleteButton from '@/components/admin/cell/DeleteButton.vue'
import CellEventType from '@/components/admin/cell/EventType.vue'
import eventGrid from '@/grids/partymeister-core/events'
import eventTypeRepository from '@/api/partymeister-core/eventTypes'
import scheduleRepository from '@/api/partymeister-core/schedules'
import axios from 'axios'
import Repository from '@/types/repository'

export default defineComponent({
  name: 'admin-partymeister-core-events',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Define columns for grid
    const columns = ref([
      {
        name: t('partymeister-core.schedules.schedule'),
        prop: 'schedule.name',
      },
      { name: t('partymeister-core.events.name'), prop: 'name' },
      {
        name: t('partymeister-core.event_types.event_type'),
        prop: 'event_type.name',
        components: [{ name: 'CellEventType' }],
      },
      {
        name: t('partymeister-core.events.starts_at'),
        prop: 'starts_at',
        renderer: { type: 'date', format: 'Y-MM-DD H:mm' },
      },
      {
        name: t('partymeister-core.events.is_visible'),
        prop: 'is_visible',
        renderer: { type: 'boolean' },
      },
      {
        name: t('partymeister-core.events.is_organizer_only'),
        prop: 'is_organizer_only',
        renderer: { type: 'boolean' },
      },
      {
        name: '',
        prop: 'actions',
        columnStyle: 'width: 200px',
        components: [
          {
            name: 'EditButton',
            options: {
              route: 'admin.partymeister-core.events.edit',
              name: t('global.edit'),
            },
          },
          { name: 'DeleteButton', options: { name: t('global.delete') } },
        ],
      },
    ])

    // Define filters for grid
    const filters = ref([
      { name: 'SearchFilter', options: {} },
      {
        name: 'SelectFilter',
        options: {
          parameter: 'schedule_id',
          emptyOption:
            t('global.filter') +
            ': ' +
            t('partymeister-core.schedules.schedule'),
          options: <any>[],
        },
      },
      {
        name: 'SelectFilter',
        options: {
          parameter: 'event_type_id',
          emptyOption:
            t('global.filter') +
            ': ' +
            t('partymeister-core.event_types.event_type'),
          options: <any>[],
        },
      },
    ])

    const loadComponents = [
      {
        name: 'CellEventType',
        object: CellEventType,
      },
    ]

    // Get schedules from api
    const schedules: Repository = scheduleRepository(axios)
    schedules.index({}).then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {
        filters.value[1].options.options.push({
          name: response.data.data[i].name,
          value: response.data.data[i].id,
        })
      }
    })

    // Get event types from api
    const repository: Repository = eventTypeRepository(axios)
    repository.index({}).then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {
        filters.value[2].options.options.push({
          name: response.data.data[i].name,
          value: response.data.data[i].id,
        })
      }
    })

    // WE START THE OUTSOURCED CODE HERE
    const { rows, meta, refreshRecords, handleCellEvent } = eventGrid()

    return {
      columns,
      filters,
      rows,
      meta,
      refreshRecords,
      loadComponents,
      handleCellEvent,
      // deleteRecord,
    }
  },
})
</script>
