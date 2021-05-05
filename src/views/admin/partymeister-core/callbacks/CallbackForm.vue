<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <form @submit="onSubmit">
      <div class="rounded-t bg-white mb-0 px-6 py-6">
        <div class="text-center flex justify-between">
          <h6 class="text-blueGray-700 text-xl font-bold">{{ title }}</h6>
          <div>
            <router-link :to="{ name: 'partymeister-core.callbacks.index'}">
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
            <select-field id="action" name="action" :label="$t('partymeister-core.callbacks.action')" :options="actions"
                          :value="model.action"
            ></select-field>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <select-field id="destination" name="destination" :label="$t('partymeister-core.callbacks.destination')"
                          :options="destinations"
                          :value="model.destination"
            ></select-field>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300"/>

        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Payload information
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <input-field type="text" name="title" id="title" :label="$t('partymeister-core.callbacks.title')"
                         :value="model.title"></input-field>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <input-field type="text" name="link" id="link" :label="$t('partymeister-core.callbacks.link')"
                         :value="model.link"></input-field>
          </div>
          <div class="w-full px-4">
            <text-area-field id="body" name="body" :label="$t('partymeister-core.callbacks.body')"
                             :value="model.body"></text-area-field>
          </div>

        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300"/>

        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Timing
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <checkbox-field id="is_timed" name="is_timed" :label="$t('partymeister-core.callbacks.is_timed')"
                            :value="model.is_timed"></checkbox-field>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <input-field id="embargo_until" name="embargo_until" type="datetime-local"
                         :label="$t('partymeister-core.callbacks.embargo_until')"
                         :value="model.embargo_until"></input-field>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300"/>

        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Static information
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <checkbox-field id="has_fired" name="has_fired" :label="$t('partymeister-core.callbacks.has_fired')"
                            :value="model.has_fired"></checkbox-field>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <input-field id="fired_at" name="fired_at" type="datetime-local"
                         :label="$t('partymeister-core.callbacks.fired_at')"
                         :value="model.fired_at"></input-field>
          </div>

          <div class="w-full lg:w-6/12 px-4">
            <static-field :label="$t('partymeister-core.callbacks.hash')" :value="model.hash"
                          :empty-value="$t('partymeister-core.callbacks.empty_value')"></static-field>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <static-field :label="$t('partymeister-core.callbacks.payload')" :value="model.payload"
                          :empty-value="$t('partymeister-core.callbacks.empty_value')"></static-field>
          </div>

        </div>

      </div>
    </form>
  </div>
</template>
<script>

import SelectField from "@/components/Forms/SelectField";
import TextAreaField from "@/components/Forms/TextAreaField";
import CheckboxField from "@/components/Forms/CheckboxField";
import InputField from "@/components/Forms/InputField";

import {defineComponent, ref} from "vue";
import StaticField from "@/components/Forms/StaticField";
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import callbackForm from "@/forms/partymeister-core/callbackForm";

export default defineComponent({
  components: {
    StaticField,
    SelectField,
    TextAreaField,
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
    const {model, actions, destinations, getData, onSubmit} = callbackForm();

    // Set page title
    store.state.pageTitle = t('partymeister-core.callbacks.callbacks');

    // Set default action title
    const title = ref(t('partymeister-core.callbacks.new'));

    // Get id from route and load record
    const id = router.currentRoute.value.params.id;
    if (id) {
      title.value = t('partymeister-core.callbacks.edit');
      getData(id);
    }

    return {
      actions,
      destinations,
      model,
      title,
      onSubmit
    };
  }
});
</script>
