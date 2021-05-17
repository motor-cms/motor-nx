<template>
  <AdminCommonGrid
    :name="$t('partymeister-core.callbacks.callbacks')"
    create-route="admin.partymeister-core.callbacks.create"
    :create-label="$t('partymeister-core.callbacks.new')"
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
import { computed, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import EditButton from '@/components/admin/cell/EditButton.vue'
import DeleteButton from '@/components/admin/cell/DeleteButton.vue'
import callbackGrid from '@/grids/partymeister-core/callbacks'

export default defineComponent({
  name: 'admin-partymeister-core-callbacks',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t, tm } = useI18n()

    // Get options for destination filter
    const destinationOptions = computed(() => {
      let options: any = []
      Object.entries(tm('partymeister-core.callbacks.destinations')).forEach(
        (value) => {
          options.push({
            name: t('partymeister-core.callbacks.destinations.' + value[0]),
            value: value[0],
          })
        }
      )
      return options
    })

    // Define columns for grid
    const columns = ref([
      { name: t('partymeister-core.callbacks.name'), prop: 'name' },
      {
        name: t('partymeister-core.callbacks.destination'),
        prop: 'destination',
        renderer: {
          type: 'translation',
          path: 'partymeister-core.callbacks.destinations',
        },
      },
      {
        name: t('partymeister-core.callbacks.embargo_until'),
        prop: 'embargo_until',
        renderer: { type: 'date', format: 'Y-MM-DD H:mm' },
      },
      {
        name: t('partymeister-core.callbacks.has_fired'),
        prop: 'has_fired',
        renderer: { type: 'boolean' },
      },
      {
        name: t('partymeister-core.callbacks.is_timed'),
        prop: 'is_timed',
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
              route: 'admin.partymeister-core.callbacks.edit',
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
          parameter: 'destination',
          emptyOption:
            t('global.filter') +
            ': ' +
            t('partymeister-core.callbacks.destination'),
          options: destinationOptions,
        },
      },
    ])

    // WE START THE OUTSOURCED CODE HERE
    const { rows, meta, refreshRecords, handleCellEvent } = callbackGrid()

    return {
      columns,
      filters,
      rows,
      meta,
      refreshRecords,
      handleCellEvent,
      // deleteRecord,
    }
  },
})
</script>
