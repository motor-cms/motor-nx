<template>
  <AdminCommonGrid
    :name="$t('motor-backend.category_trees.category_trees')"
    create-route="admin.motor-backend.category-trees.create"
    :create-label="$t('motor-backend.category_trees.new')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="categoryTrees"
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
import grid from '@/grids/motor-backend/categoryTreeGrid'
import Button from '@/components/admin/cell/Button.vue'
import CellTree from '@/components/admin/cell/Tree.vue'

export default defineComponent({
  name: 'admin-motor-backend.category-trees',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Define columns for grid
    const columns = ref([
      {
        name: t('motor-backend.categories.name'),
        prop: 'name',
      },
      {
        name: '',
        prop: 'actions',
        columnStyle: 'width: 300px',
        rowWrapperClass: 'justify-content-end',
        components: [
          {
            name: 'Button',
            options: {
              route: 'admin.motor-backend.categories',
              name: t('motor-backend.category_trees.show_nodes'),
            },
          },
          {
            name: 'EditButton',
            options: {
              route: 'admin.motor-backend.category-trees.edit',
              name: t('global.edit'),
            },
          },
          { name: 'DeleteButton', options: { name: t('global.delete') } },
        ],
      },
    ])

    // Define filters for grid
    const filters = ref([{ name: 'SearchFilter', options: {} }])

    const loadComponents = <any>[
      {
        name: 'Button',
        object: Button,
      },
    ]

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
