<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <card-grid
            :name="$t('partymeister-core.event_types.event_types')"
            create-route="partymeister-core.event_types.create"
            :create-label="$t('partymeister-core.event_types.new')"
            :rows="rows"
            :columns="columns"
            :meta="meta"
            :filters="filters"
            :load-components="loadComponents"
            resource="event_types"
            @submit="refreshRecords"
            @submit-cell="handleCellEvent"
        ></card-grid>
      </div>
    </div>
  </div>
</template>
<script>

import CardGrid from "@/components/Cards/CardGrid";
import 'mosha-vue-toastify/dist/style.css'
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import {ref} from "vue";
import eventTypeRepository from "@/repositories/partymeister-core/eventTypeRepository";

export default {
  components: {
    CardGrid
  },
  setup() {
    // Load i18n module
    const {t} = useI18n();

    // Load vuex
    const store = useStore();

    // Set page title
    store.state.pageTitle = t('partymeister-core.event_types.event_types');

    // Define columns for grid
    const columns = ref([
      {name: t('partymeister-core.event_types.name'), prop: "name"},
      {
        name: t('partymeister-core.event_types.web_color'), prop: "web_color", components: [
          {name: 'ColorBox'}]
      },
      {
        name: t('partymeister-core.event_types.slide_color'), prop: "slide_color", components: [
          {name: 'ColorBox'}]
      },
      {
        name: '', prop: "actions", columnStyle: "width: 200px", components: [
          {name: 'EditButton', options: {route: 'partymeister-core.event_types.edit', name: t('global.edit')}},
          {name: 'DeleteButton', options: {name: t('global.delete')}},
        ]
      },
    ]);

    // Define filters for grid
    const filters = ref([
      {name: 'SearchFilter', options: {}},
    ]);

    const loadComponents = [
      {
        name: 'ColorBox', import: import('@/components/Cells/ColorBox')
      }
    ];

    // WE START THE OUTSOURCED CODE HERE
    const {handleCellEvent, deleteRecord, refreshRecords, meta, rows} = eventTypeRepository(true);

    return {
      columns,
      filters,
      rows,
      meta,
      refreshRecords,
      handleCellEvent,
      deleteRecord,
      loadComponents,
    }
  }
};
</script>

<style lang="scss">
</style>
