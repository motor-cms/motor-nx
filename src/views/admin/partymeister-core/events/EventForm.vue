<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <form @submit="onSubmit">
      <div class="rounded-t bg-white mb-0 px-6 py-6">
        <div class="text-center flex justify-between">
          <h6 class="text-blueGray-700 text-xl font-bold">{{ title }}</h6>
          <div>
            <router-link :to="{ name: 'partymeister-core.events.index'}">
              <button
                  class="justify-end bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="submit"
              >
                {{ $t('global.back') }}
              </button>
            </router-link>
            <button
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit"
            >
              {{ $t('global.save') }}
            </button>
          </div>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Basic information
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full px-4">
            <input-field type="text" id="name" name="name" :label="$t('partymeister-core.callbacks.name')"
                         :value="model.name"
            ></input-field>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <select-field id="schedule_id" name="schedule_id" :label="$t('partymeister-core.schedules.schedule')"
                          :options="schedules"
                          :value="model.schedule_id"
            ></select-field>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <select-field id="event_type_id" name="event_type_id"
                          :label="$t('partymeister-core.event_types.event_type')"
                          :options="eventTypes"
                          :value="model.event_type_id"
            ></select-field>
          </div>
        </div>


        <hr class="mt-6 border-b-1 border-blueGray-300"/>

        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Timing
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <input-field id="starts_at" name="starts_at" type="datetime-local"
                         :label="$t('partymeister-core.events.starts_at')"
                         :value="model.starts_at"></input-field>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <input-field id="sort_position" name="embargo_until" type="text"
                         :label="$t('partymeister-core.events.sort_position')"
                         :value="model.sort_position"></input-field>
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <checkbox-field id="is_visible" name="is_visible" :label="$t('partymeister-core.events.is_visible')"
                            :value="model.is_visible"></checkbox-field>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <checkbox-field id="is_organizer_only" name="is_organizer_only"
                            :label="$t('partymeister-core.events.is_organizer_only')"
                            :value="model.is_organizer_only"></checkbox-field>
          </div>

        </div>

      </div>
    </form>
  </div>
</template>
<script>

import SelectField from "@/components/Forms/SelectField";
import CheckboxField from "@/components/Forms/CheckboxField";
import InputField from "@/components/Forms/InputField";

import {defineComponent, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import eventForm from "@/forms/partymeister-core/eventForm";

export default defineComponent({
  components: {
    SelectField,
    CheckboxField,
    InputField,
  },
  setup() {
    // Load i18n module
    const {t} = useI18n();

    // Load vuex
    const store = useStore();

    // Load router
    const router = useRouter();

    // Load form
    const {model, eventTypes, schedules, getData, onSubmit} = eventForm();

    // Set page title
    store.state.pageTitle = t('partymeister-core.events.events');

    // Set default action title
    const title = ref(t('partymeister-core.events.new'));

    // Get id from route and load record
    const id = router.currentRoute.value.params.id;
    if (id) {
      title.value = t('partymeister-core.events.edit');
      getData(id);
    }

    return {
      eventTypes,
      schedules,
      model,
      title,
      onSubmit
    };
  }
});
</script>
