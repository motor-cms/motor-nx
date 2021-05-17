<template>
  <AdminCommonGrid
    :name="$t('partymeister-core.schedules.schedules')"
    create-route="admin.partymeister-core.schedules.create"
    :create-label="$t('partymeister-core.schedules.new')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="callbacks"
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
import schedulesGrid from '@/grids/partymeister-core/schedules'

export default defineComponent({
  name: 'admin-partymeister-core-schedules',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Define columns for grid
    const columns = ref([
      {
        name: t('partymeister-core.schedules.name'),
        prop: 'name',
      },
      {
        name: t('partymeister-core.events.events'),
        prop: 'events',
        renderer: { type: 'count' },
      },
      {
        name: '',
        prop: 'actions',
        columnStyle: 'width: 200px',
        rowWrapperClass: 'justify-content-end',
        components: [
          {
            name: 'EditButton',
            options: {
              route: 'admin.partymeister-core.schedules.edit',
              name: t('global.edit'),
            },
          },
          { name: 'DeleteButton', options: { name: t('global.delete') } },
        ],
      },
    ])

    // Define filters for grid
    const filters = ref([{ name: 'SearchFilter', options: {} }])

    // WE START THE OUTSOURCED CODE HERE
    const { rows, meta, refreshRecords, handleCellEvent } = schedulesGrid()
    return {
      columns,
      filters,
      rows,
      meta,
      refreshRecords,
      handleCellEvent,
    }
  },
})
</script>
