<template>
  <AdminCommonGrid
    :name="$t('motor-backend.clients.clients')"
    create-route="admin.motor-backend.clients.create"
    :create-label="$t('motor-backend.clients.new')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="clients"
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
import grid from '@/grids/motor-backend/clientGrid'

export default defineComponent({
  name: 'admin-motor-backend.clients',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Define columns for grid
    const columns = ref([
      {
        name: t('motor-backend.clients.name'),
        prop: 'name',
      },
      {
        name: t('motor-backend.clients.contact'),
        prop: 'contact_name',
      },
      {
        name: t('motor-backend.clients.slug'),
        prop: 'slug',
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
              route: 'admin.motor-backend.clients.edit',
              name: t('global.edit'),
            },
          },
          { name: 'DeleteButton', options: { name: t('global.delete') } },
        ],
      },
    ])

    // Define filters for grid
    const filters = ref([{ name: 'SearchFilter', options: {} }])

    const loadComponents = <any>[]

    // WE START THE OUTSOURCED CODE HERE
    const { rows, meta, refreshRecords, handleCellEvent } = grid()
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
