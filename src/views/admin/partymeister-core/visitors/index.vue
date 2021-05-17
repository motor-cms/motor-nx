<template>
  <AdminCommonGrid
    :name="$t('partymeister-core.visitors.visitors')"
    create-route="admin.partymeister-core.visitors.create"
    :create-label="$t('partymeister-core.visitors.new')"
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
import visitorsGrid from '@/grids/partymeister-core/visitors'

export default defineComponent({
  name: 'admin-partymeister-core-visitors',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Define columns for grid
    const columns = ref([
      {
        name: t('partymeister-core.visitors.name'),
        prop: 'name',
      },
      {
        name: t('partymeister-core.visitors.group'),
        prop: 'group',
      },
      {
        name: t('partymeister-core.visitors.country'),
        prop: 'country_iso_3166_1',
      },
      {
        name: t('partymeister-core.visitors.registered'),
        prop: 'created_at',
        renderer: { type: 'date', format: 'Y-MM-DD H:mm' },
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
              route: 'admin.partymeister-core.visitors.edit',
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
    const { rows, meta, refreshRecords, handleCellEvent } = visitorsGrid()
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
