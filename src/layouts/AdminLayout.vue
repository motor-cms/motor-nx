<template>
  <AdminContainer>
    <router-view />
  </AdminContainer>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AdminContainer from '@/components/admin/Container.vue'
import '@/assets/js/soft-ui-dashboard.js'

export default defineComponent({
  name: 'admin-partymeister-core-callbacks',
  components: {
    AdminContainer,
  },
  setup() {
    document.body.classList.add('g-sidenav-show', 'bg-gray-100')

    document.addEventListener('keydown', (event) => {
      if (event.code === 'KeyK' && event.metaKey) {
        const element = document.getElementById(
          'motor-grid-search'
        ) as HTMLInputElement

        element.focus()
        element.select()
      }
    })
  },
})
</script>
