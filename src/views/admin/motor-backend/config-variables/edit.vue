<template>
  <AdminCommonForm
    back-route="admin.motor-backend.config-variables"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-4">
        <FormsInputField
          type="text"
          name="package"
          id="package"
          :label="$t('motor-backend.config_variables.package')"
          :value="model.package"
        ></FormsInputField>
      </div>
      <div class="col-md-4">
        <FormsInputField
          type="text"
          name="group"
          id="group"
          :label="$t('motor-backend.config_variables.group')"
          :value="model.group"
        ></FormsInputField>
      </div>
      <div class="col-md-4">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('motor-backend.config_variables.name')"
          :value="model.name"
        ></FormsInputField>
      </div>
      <div class="col-md-12">
        <FormsTextAreaField
          type="text"
          name="value"
          id="value"
          :label="$t('motor-backend.config_variables.value')"
          :value="model.value"
        ></FormsTextAreaField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from '@/components/admin/common/Form.vue'
import FormsInputField from '@/components/forms/InputField.vue'
import FormsTextAreaField from '@/components/forms/TextAreaField.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import form from '@/forms/motor-backend/configVariableForm'

export default defineComponent({
  name: 'admin-motor-backend-config-variables-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsTextAreaField,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, getData, onSubmit } = form()

    // Set default action title
    const title = ref(t('motor-backend.config_variables.new'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('motor-backend.config_variables.edit')
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
