<template>
  <router-link :to="{ name: options.route, params: { id: record.id}}">
    <button
        class="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button">
      {{ options.name }}
    </button>
  </router-link>
</template>
<script>

export default {
  name: 'EditButton',
  props: {
    options: Object,
    record: Object
  },
};
</script>
