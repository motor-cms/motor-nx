<template>
  <AdminCommonForm
    back-route="admin.motor-backend.roles"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('motor-backend.roles.name')"
          :value="model.name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="guard_name"
          id="guard_name"
          :label="$t('motor-backend.roles.guard_name')"
          :value="model.guard_name"
        ></FormsInputField>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <FormsCheckboxArrayField
          name="permissions"
          id="permissions"
          :label="$t('motor-backend.permissions.permissions')"
          :value="model.permissions"
          :options="permissions"
        ></FormsCheckboxArrayField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import AdminCommonForm from '@/components/admin/common/Form.vue'
import FormsInputField from '@/components/forms/InputField.vue'
import FormsCheckboxArrayField from '@/components/forms/CheckboxArrayField.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import form from '@/forms/motor-backend/roleForm'

export default defineComponent({
  name: 'admin-motor-backend-roles-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsCheckboxArrayField,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, getData, onSubmit, permissions } = form()

    // Set default action title
    const title = ref(t('motor-backend.roles.new'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('motor-backend.roles.edit')
      getData(id)
    }

    // Sanitize roles
    watch(model, () => {
      const checkAgainst = Object.entries(model.value.permissions)

      const options = []
      for (const object of checkAgainst) {
        const checkObject: any = object
        if (checkObject[1]) {
          options.push(checkObject[1]['id'])
        }
      }

      model.value.permissions = options
    })

    return {
      model,
      title,
      onSubmit,
      permissions,
    }
  },
})
</script>
