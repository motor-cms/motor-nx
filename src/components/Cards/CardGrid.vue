<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg mb-4 text-blueGray-700">
            {{ name }}
            <router-link v-if="createRoute" :to="{ name: createRoute }">
            <button class="float-right bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1">
              {{ createLabel }}</button>
            </router-link>
          </h3>
          <component v-for="f in filters" :key="f.name" :is="f.name" :options="f.options"
                     @submit="submitFilter"></component>

          <span class="float-right">
            <span v-if="meta.total > 0">
              {{ meta.from }} - {{ meta.to }} / {{ meta.total }}
            </span>
            <select
                class="mx-4 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-16"
                name="per-page" @change="submitFilter($event)" v-model="filterValues.per_page">
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>

            <button @click="previousPage" v-if="meta.current_page > 1"
                    class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 mb-1"> <i
                class="fas fa-chevron-left"></i> </button>

            <button v-if="meta.current_page === 1"
                    class="bg-blueGray-200 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow outline-none mr-2 mb-1"> <i
                class="fas fa-chevron-left"></i> </button>

            <button @click="nextPage()" v-if="meta.current_page < meta.last_page"
                    class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1"> <i
                class="fas fa-chevron-right"></i> </button>

            <button v-if="meta.current_page === meta.last_page"
                    class="bg-blueGray-200 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow outline-none mb-1"> <i
                class="fas fa-chevron-right"></i> </button>
          </span>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
        <tr>
          <th v-for="column in columns" :key="column.name"
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-200 text-blueGray-500 border-blueGray-100"
              :style="column.columnStyle"
          >
            {{ column.name }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="meta.total === 0">
          <td :colspan="columns.length">
            <h3 class="p-8 text-lg font-bold text-center">{{ $t('global.no_records_found') }}</h3>
          </td>
        </tr>
        <tr v-for="(row, index) in rows" :key="row.id" :class="(index % 2) === 0 ? '' : 'bg-blueGray-50'">
          <td v-for="column in columns" :key="column.name"
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm p-2"
              :class="column.rowClass"
          >
            <component v-for="component in column.components" :key="component.name" :is="component.name"
                       :options="component.options" :record="row" :prop="column.prop" :resource="resource" @submit="submitCell"></component>
            <template v-if="column.renderer">
              <div v-html="renderer(column.renderer, getPropertyValue(row, column.prop))"></div>
            </template>
            <template v-if="!column.renderer && !column.components">
              {{ getPropertyValue(row, column.prop) }}
            </template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>

import moment from "moment";
import SearchFilter from "@/components/Filters/SearchFilter";
import SelectFilter from "@/components/Filters/SelectFilter";
import CellButton from "@/components/Cells/Button";
import EditButton from "@/components/Cells/EditButton";
import DeleteButton from "@/components/Cells/DeleteButton";
import {defineAsyncComponent} from "vue";

export default {
  data() {
    return {
      filterValues: {per_page: 25, page: 1},
    };
  },
  components: {
    SearchFilter,
    SelectFilter,
    CellButton,
    EditButton,
    DeleteButton,
  },
  props: {
    name: String,
    columns: Array,
    rows: Object,
    meta: Object,
    filters: Array,
    resource: String,
    loadComponents: Array,
    createRoute: String,
    createLabel: String,
  },
  emits: ['submit', 'submitCell'],
  methods: {
    renderer(renderer, value) {
      switch (renderer.type) {
        case 'translation':
          return this.$t(renderer.path + '.' + value)
        case 'boolean':
          return value ? this.$t('global.yes') : this.$t('global.no')
        case 'date':
          if (!value) {
            return
          }
          if (renderer.format) {
            return moment(value).format(renderer.format);
          }
          return moment(value);
        default:
          return value;
      }
    },
    getPropertyValue(object, property) {
      property = property.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, ''); // convert indexes to properties and strip leading dot
      let a = property.split('.');
      for (let i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in object) {
          object = object[k];
        } else {
          return;
        }
      }
      return object;
    },
    submitFilter(data) {
      // Reset page when filtering or searching
      this.filterValues.page = 1;
      if (data.parameter) {
        this.filterValues[data.parameter] = data.value;
      }
      this.$emit('submit', this.filterValues);
    },
    previousPage() {
      this.filterValues.page--;
      this.$emit('submit', this.filterValues);
    },
    nextPage() {
      this.filterValues.page++;
      this.$emit('submit', this.filterValues);
    },
    submitCell(params) {
      this.$emit('submitCell', {componentParams: params, filterValues: this.filterValues});
    }
  },
  created() {
    if (this.loadComponents) {
      this.loadComponents.forEach(component => {
        this.$options.components[component.name] = defineAsyncComponent(() =>
            component.import
        )
      });
    }

  },
};
</script>
