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
    :loadComponents="loadComponents"
    @submit="refreshRecords"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>
<script lang="ts">
import AdminCommonGrid from '@/components/admin/common/Grid.vue'
// import 'mosha-vue-toastify/dist/style.css'
import { computed, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
// import {useStore} from "vuex";
import callbackRepository from '@/api/partymeister-core/callbacks'
// import callbackRepository from "@/repositories/partymeister-core/callbackRepository";
import EditButton from '@/components/admin/cell/EditButton.vue'
import DeleteButton from '@/components/admin/cell/DeleteButton.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export default defineComponent({
  name: 'admin-partymeister-core-callbacks',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t, tm } = useI18n()

    const toast = useToast()

    // Load vuex
    // const store = useStore();

    // Set page title
    // store.state.pageTitle = t('partymeister-core.callbacks.callbacks');

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
    // const { handleCellEvent, deleteRecord, refreshRecords, meta, rows } = callbackRepository(true);
    const repository = callbackRepository(axios)

    const rows = ref([])
    const meta = ref({ current_page: 1, from: 1, to: 1 })

    repository.index({}).then((result) => {
      rows.value = result.data.data
      meta.value = result.data.meta
    })

    const refreshRecords = async (params: {}) => {
      repository.index(params).then((result) => {
        rows.value = result.data.data
        meta.value = result.data.meta
      })
    }

    const handleCellEvent = async (params: {
      filterValues: any
      componentParams: any
    }) => {
      switch (params.componentParams.component) {
        case 'DeleteButton':
          // Delete the record
          await repository.delete(params.componentParams.record)

          toast.success(t('partymeister-core.callbacks.deleted'))

          await refreshRecords(params.filterValues)
          break
        default:
          console.log('UNHANDLED EVENT', params.componentParams)
      }
    }

    const loadComponents = [
      {
        name: 'EditButton',
        object: EditButton,
      },
      {
        name: 'DeleteButton',
        object: DeleteButton,
      },
    ]

    // const getRecords = (async (params: object = {}) => {
    //   const response = await repository.index(params)
    //
    //   this.rows.value = response.data;
    //   this.meta.value = response.meta;
    // })
    //
    //
    // getRecords().then(response => {
    //
    // })

    //
    // console.log(repository)

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
