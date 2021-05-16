<template>
  <AdminCommonForm
    back-route="admin.partymeister-core.visitors"
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
          :label="$t('partymeister-core.visitors.name')"
          :value="model.name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="group"
          id="group"
          :label="$t('partymeister-core.visitors.group')"
          :value="model.group"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="email"
          name="email"
          id="email"
          :label="$t('partymeister-core.visitors.email')"
          :value="model.email"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="password"
          name="password"
          id="password"
          :label="$t('partymeister-core.visitors.password')"
          :value="model.password"
        ></FormsInputField>
      </div>
      <div class="col-md-12">
        <FormsSelect2Field
          type="text"
          name="country_iso_3166_1"
          id="country_iso_3166_1"
          :label="$t('partymeister-core.visitors.country')"
          :value="model.country_iso_3166_1"
          :options="options"
        ></FormsSelect2Field>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from '@/components/admin/common/Form.vue'
import FormsInputField from '@/components/forms/InputField.vue'
import FormsSelect2Field from '@/components/forms/Select2Field.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import visitorForm from '@/forms/partymeister-core/visitorForm'

export default defineComponent({
  name: 'admin-partymeister-core-visitors-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsSelect2Field,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, getData, onSubmit, options } = visitorForm()

    // Set default action title
    const title = ref(t('partymeister-core.visitors.new'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('partymeister-core.visitors.edit')
      getData(id)
    }

    return {
      model,
      title,
      onSubmit,
      options,
    }
  },
})
</script>
