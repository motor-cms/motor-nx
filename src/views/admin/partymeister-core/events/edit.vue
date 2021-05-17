<template>
  <AdminCommonForm
    back-route="admin.partymeister-core.events"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsSelectField
          id="schedule_id"
          name="schedule_id"
          :label="$t('partymeister-core.schedules.schedule')"
          :options="schedules"
          :value="model.schedule_id"
        ></FormsSelectField>
      </div>
      <div class="col-md-6">
        <FormsSelectField
          id="event_type_id"
          name="event_type_id"
          :label="$t('partymeister-core.event_types.event_type')"
          :options="eventTypes"
          :value="model.event_type_id"
        ></FormsSelectField>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('partymeister-core.events.name')"
          :value="model.name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="datetime-local"
          name="starts_at"
          id="starts_at"
          :label="$t('partymeister-core.events.starts_at')"
          :value="model.starts_at"
        ></FormsInputField>
      </div>
    </div>

    <hr />

    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Additional information
    </h6>
    <div class="row">
      <div class="col-md-4">
        <FormsCheckboxField
          name="is_visible"
          id="is_visible"
          :label="$t('partymeister-core.events.is_visible')"
          :value="model.is_visible"
        ></FormsCheckboxField>
      </div>
      <div class="col-md-4">
        <FormsCheckboxField
          name="is_organizer_only"
          id="is_organizer_only"
          :label="$t('partymeister-core.events.is_organizer_only')"
          :value="model.is_organizer_only"
        ></FormsCheckboxField>
      </div>
      <div class="col-md-4">
        <FormsInputField
          type="text"
          name="sort_position"
          id="sort_position"
          :label="$t('partymeister-core.events.sort_position')"
          :value="model.sort_position"
        ></FormsInputField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from '@/components/admin/common/Form.vue'
import FormsInputField from '@/components/forms/InputField.vue'
import FormsSelectField from '@/components/forms/SelectField.vue'
import FormsCheckboxField from '@/components/forms/CheckboxField.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import eventForm from '@/forms/partymeister-core/eventForm'

export default defineComponent({
  name: 'admin-partymeister-core-events-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsSelectField,
    FormsCheckboxField,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, schedules, eventTypes, getData, onSubmit } = eventForm()

    // Set default action title
    const title = ref(t('partymeister-core.events.new'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('partymeister-core.new.edit')
      getData(id)
    }

    return {
      eventTypes,
      schedules,
      model,
      title,
      onSubmit,
    }
  },
})
</script>
