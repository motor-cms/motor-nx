<template>
  <button :class="options.cssClass" class="btn btn-sm" type="button">
    {{ options.name }}
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CellButton',
  props: {
    options: Object,
  },
  data() {
    return {
      term: '',
    }
  },
  emits: ['submit'],
})
</script>
