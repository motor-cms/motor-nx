<template>
  <AdminCommonForm
    back-route="admin.motor-backend.users"
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
          :label="$t('motor-backend.users.name')"
          :value="model.name"
        ></FormsInputField>
        <FormsImageField
          name="avatar"
          id="avatar"
          :label="$t('motor-backend.users.avatar')"
          :value="model.avatar"
        ></FormsImageField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from '@/components/admin/common/Form.vue'
import FormsInputField from '@/components/forms/InputField.vue'
import FormsImageField from '@/components/forms/ImageField.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import form from '@/forms/motor-backend/userForm'

export default defineComponent({
  name: 'admin-motor-backend-users-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsImageField,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, getData, onSubmit } = form()

    // Set default action title
    const title = ref(t('motor-backend.users.new'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('motor-backend.users.edit')
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
