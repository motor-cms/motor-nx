<template>
  <AdminCommonForm
    back-route="admin.partymeister-core.callbacks"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-12">
        <FormsInputField
          type="text"
          id="name"
          name="name"
          :label="$t('partymeister-core.callbacks.name')"
          :value="model.name"
        ></FormsInputField>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <FormsSelectField
          id="action"
          name="action"
          :label="$t('partymeister-core.callbacks.action')"
          :options="actions"
          :value="model.action"
        ></FormsSelectField>
      </div>
      <div class="col-md-6">
        <FormsSelectField
          id="destination"
          name="destination"
          :label="$t('partymeister-core.callbacks.destination')"
          :options="destinations"
          :value="model.destination"
        ></FormsSelectField>
      </div>
    </div>

    <hr />

    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Payload information
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="title"
          id="title"
          :label="$t('partymeister-core.callbacks.title')"
          :value="model.title"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="link"
          id="link"
          :label="$t('partymeister-core.callbacks.link')"
          :value="model.link"
        ></FormsInputField>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <FormsTextAreaField
          id="body"
          name="body"
          :label="$t('partymeister-core.callbacks.body')"
          :value="model.body"
        ></FormsTextAreaField>
      </div>
    </div>

    <hr />

    <h6 class="text-uppercase text-body text-xs font-weight-bolder">Timing</h6>
    <div class="row">
      <div class="col-md-6">
        <FormsCheckboxField
          id="is_timed"
          name="is_timed"
          :label="$t('partymeister-core.callbacks.is_timed')"
          :value="model.is_timed"
        ></FormsCheckboxField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          id="embargo_until"
          name="embargo_until"
          type="datetime-local"
          :label="$t('partymeister-core.callbacks.embargo_until')"
          :value="model.embargo_until"
        ></FormsInputField>
      </div>
    </div>

    <hr />

    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Static information
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsCheckboxField
          id="has_fired"
          name="has_fired"
          :label="$t('partymeister-core.callbacks.has_fired')"
          :value="model.has_fired"
        ></FormsCheckboxField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          id="fired_at"
          name="fired_at"
          type="datetime-local"
          :label="$t('partymeister-core.callbacks.fired_at')"
          :value="model.fired_at"
        ></FormsInputField>
      </div>

      <div class="col-md-6">
        <FormsStaticField
          :label="$t('partymeister-core.callbacks.hash')"
          :value="model.hash"
          :empty-value="$t('partymeister-core.callbacks.empty_value')"
        ></FormsStaticField>
      </div>
      <div class="col-md-6">
        <FormsStaticField
          :label="$t('partymeister-core.callbacks.payload')"
          :value="model.payload"
          :empty-value="$t('partymeister-core.callbacks.empty_value')"
        ></FormsStaticField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from '@/components/admin/common/Form.vue'
import FormsStaticField from '@/components/forms/StaticField.vue'
import FormsInputField from '@/components/forms/InputField.vue'
import FormsSelectField from '@/components/forms/SelectField.vue'
import FormsTextAreaField from '@/components/forms/TextAreaField.vue'
import FormsCheckboxField from '@/components/forms/CheckboxField.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import callbackForm from '@/forms/partymeister-core/callbackForm'

export default defineComponent({
  name: 'admin-partymeister-core-callbacks-create',
  components: {
    AdminCommonForm,
    FormsStaticField,
    FormsInputField,
    FormsSelectField,
    FormsTextAreaField,
    FormsCheckboxField,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, actions, destinations, getData, onSubmit } = callbackForm()

    // Set default action title
    const title = ref(t('partymeister-core.callbacks.new'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('partymeister-core.callbacks.edit')
      getData(id)
    }

    return {
      actions,
      destinations,
      model,
      title,
      onSubmit,
    }
  },
})
</script>
