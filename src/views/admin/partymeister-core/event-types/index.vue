<template>
  <AdminCommonGrid
    :name="$t('partymeister-core.event_types.event_types')"
    create-route="admin.partymeister-core.event-types.create"
    :create-label="$t('partymeister-core.event_types.new')"
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
import CellColorBox from '@/components/admin/cell/ColorBox.vue'
import eventTypesGrid from '@/grids/partymeister-core/eventTypes'

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
        name: t('partymeister-core.event_types.name'),
        prop: 'name',
      },
      {
        name: t('partymeister-core.event_types.web_color'),
        prop: 'web_color',
        components: [{ name: 'CellColorBox' }],
      },
      {
        name: t('partymeister-core.event_types.slide_color'),
        prop: 'slide_color',
        components: [{ name: 'CellColorBox' }],
      },
      {
        name: '',
        prop: 'actions',
        columnStyle: 'width: 200px',
        components: [
          {
            name: 'EditButton',
            options: {
              route: 'admin.partymeister-core.event-types.edit',
              name: t('global.edit'),
            },
          },
          { name: 'DeleteButton', options: { name: t('global.delete') } },
        ],
      },
    ])

    // Define filters for grid
    const filters = ref([{ name: 'SearchFilter', options: {} }])

    const loadComponents = [
      {
        name: 'CellColorBox',
        object: CellColorBox,
      },
    ]

    // WE START THE OUTSOURCED CODE HERE
    const { rows, meta, refreshRecords, handleCellEvent } = eventTypesGrid()
    return {
      columns,
      filters,
      rows,
      meta,
      refreshRecords,
      loadComponents,
      handleCellEvent,
    }
  },
})
</script>
