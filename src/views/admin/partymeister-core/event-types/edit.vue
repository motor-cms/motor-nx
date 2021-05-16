<template>
  <AdminCommonForm
    back-route="admin.partymeister-core.event-types"
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
          name="name"
          id="name"
          :label="$t('partymeister-core.event_types.name')"
          :value="model.name"
        ></FormsInputField>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <FormsColorField
          type="color"
          name="web_color"
          id="web_color"
          class="color-box"
          :label="$t('partymeister-core.event_types.web_color')"
          :value="model.web_color"
        ></FormsColorField>
      </div>
      <div class="col-md-6">
        <FormsColorField
          type="color"
          name="slide_color"
          id="slide_color"
          class="color-box"
          :label="$t('partymeister-core.event_types.slide_color')"
          :value="model.slide_color"
        ></FormsColorField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from '@/components/admin/common/Form.vue'
import FormsInputField from '@/components/forms/InputField.vue'
import FormsColorField from '@/components/forms/ColorField.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import eventTypeForm from '@/forms/partymeister-core/eventTypeForm'

export default defineComponent({
  name: 'admin-partymeister-core-callbacks-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsColorField,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, getData, onSubmit } = eventTypeForm()

    // Set default action title
    const title = ref(t('partymeister-core.event_types.new'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('partymeister-core.event_types.edit')
      getData(id)
    }

    return {
      model,
      title,
      onSubmit,
    }
  },
})
</script>
