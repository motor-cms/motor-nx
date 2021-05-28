<template>
  <component :is="layout" />
</template>
<script lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'admin-backend',
  components: {
    AuthLayout,
    AdminLayout,
  },
  data() {
    return {
      layout: <string>'',
    }
  },
  watch: {
    $route(to: any): void {
      if (to.meta.layout !== undefined) {
        this.layout = <string>to.meta.layout
      } else {
        this.layout = 'AdminLayout' // this is default layout if route meta is not set
      }
    },
  },
})
</script>
