<template>
  <button :class="options.cssClass" class="text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
    {{ options.name }}
  </button>
</template>
<script>

export default {
  name: 'CellButton',
  props: {
    options: Object
  },
  data() {
    return {
      term: '',
    };
  },
  emits: ['submit'],
};
</script>
