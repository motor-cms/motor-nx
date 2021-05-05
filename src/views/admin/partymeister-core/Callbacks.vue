<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <card-grid
          :name="$t('partymeister-core.callbacks.callbacks')"
          create-route="partymeister-core.callbacks.create"
          :create-label="$t('partymeister-core.callbacks.new')"
          :rows="rows"
          :columns="columns"
          :meta="meta"
          :filters="filters"
          resource="callbacks"
          @submit="refreshRecords"
          @submit-cell="handleCellEvent"
      ></card-grid>
    </div>
  </div>
</template>
<script>

import CardGrid from "@/components/Cards/CardGrid";
import 'mosha-vue-toastify/dist/style.css'
import {computed, ref} from 'vue'
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import callbackRepository from "@/repositories/partymeister-core/callbacksRepository";


export default {
  components: {
    CardGrid
  },
  setup() {
    // Load i18n module
    const {t, tm} = useI18n();

    // Load vuex
    const store = useStore();

    // Set page title
    store.state.pageTitle = t('partymeister-core.callbacks.callbacks');

    // Get options for destination filter
    const destinationOptions = computed(() => {
      let options = [];
      Object.entries(tm('partymeister-core.callbacks.destinations')).forEach((value) => {
        options.push({name: t('partymeister-core.callbacks.destinations.' + value[0]), value: value[0]})
      });
      return options;
    });

    // Define columns for grid
    const columns = ref([
      {name: t('partymeister-core.callbacks.name'), prop: "name"},
      {
        name: t('partymeister-core.callbacks.destination'),
        prop: "destination",
        renderer: {type: 'translation', path: 'partymeister-core.callbacks.destinations'}
      },
      {
        name: t('partymeister-core.callbacks.embargo_until'),
        prop: "embargo_until",
        renderer: {type: 'date', format: 'Y-MM-DD H:mm'},
      },
      {name: t('partymeister-core.callbacks.has_fired'), prop: "has_fired", renderer: {type: 'boolean'}},
      {name: t('partymeister-core.callbacks.is_timed'), prop: "is_timed", renderer: {type: 'boolean'}},
      {
        name: '', prop: "actions", columnStyle: "width: 200px", components: [
          {name: 'EditButton', options: {route: 'partymeister-core.callbacks.edit', name: t('global.edit')}},
          {name: 'DeleteButton', options: {name: t('global.delete')}},
        ]
      },
    ]);

    // Define filters for grid
    const filters = ref([
      {name: 'SearchFilter', options: {}},
      {
        name: 'SelectFilter',
        options: {
          parameter: 'destination',
          emptyOption: t('global.filter') + ': ' + t('partymeister-core.callbacks.destination'),
          options: destinationOptions
        }
      },
    ]);


    // WE START THE OUTSOURCED CODE HERE
    const { handleCellEvent, deleteRecord, refreshRecords, meta, rows } = callbackRepository(true);

    return {
      columns,
      filters,
      rows,
      meta,
      refreshRecords,
      handleCellEvent,
      deleteRecord,
    }
  }
};
</script>

<style lang="scss">
</style>
