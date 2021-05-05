<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <card-grid
            :name="$t('partymeister-core.events.events')"
            create-route="partymeister-core.events.create"
            :create-label="$t('partymeister-core.events.new')"
            :rows="rows"
            :columns="columns"
            :meta="meta"
            :filters="filters"
            :load-components="loadComponents"
            resource="events"
            @submit="refreshRecords"
            @submit-cell="handleCellEvent"
        ></card-grid>
      </div>
    </div>
  </div>
</template>
<script>

import CardGrid from "@/components/Cards/CardGrid";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import eventRepository from "@/repositories/partymeister-core/eventRepository";
import {useStore} from "vuex";
import EventTypeService from "@/services/partymeister-core/EventTypeService";

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
    store.state.pageTitle = t('partymeister-core.events.events');

    // Define columns for grid
    const columns = ref([
      {name: t('partymeister-core.events.name'), prop: "name"},
      {
        name: t('partymeister-core.event_types.event_type'), prop: "event_type.name", components: [
          {name: 'EventType'}]
      },
      {
        name: t('partymeister-core.events.starts_at'),
        prop: "starts_at",
        renderer: {type: 'date', format: 'Y-MM-DD H:mm'},
      },
      {name: t('partymeister-core.events.is_visible'), prop: "is_visible", renderer: {type: 'boolean'}},
      {name: t('partymeister-core.events.is_organizer_only'), prop: "is_organizer_only", renderer: {type: 'boolean'}},
      {
        name: '', prop: "actions", columnStyle: "width: 200px", components: [
          {name: 'EditButton', options: {route: 'partymeister-core.events.edit', name: t('global.edit')}},
          {name: 'DeleteButton', options: {name: t('global.delete')}},
        ]
      },
    ]);

    const eventTypeService = new EventTypeService();

    // Define filters for grid
    const filters = ref([
      {name: 'SearchFilter', options: {}},
      {
        name: 'SelectFilter',
        options: {
          parameter: 'event_type_id',
          emptyOption: t('global.filter') + ': ' + t('partymeister-core.event_types.event_type'),
          // FIXME: this is super ugly
          options: eventTypeService.getRecords().then(records => {
            let options = [];
            for (let i = 0; i < records.data.length; i++) {
              options.push({name: records.data[i].name, value: records.data[i].id})
            }
            return options;
          })
        }
      },
    ]);

    const loadComponents = [
      {
        name: 'EventType', import: import('@/components/Cells/EventType')
      }
    ];

    // WE START THE OUTSOURCED CODE HERE
    const {handleCellEvent, deleteRecord, refreshRecords, meta, rows} = eventRepository(true);

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
