<template>
  <div class="relative w-full mb-3">
    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
      {{ label }}
    </label>
    <p>
      {{ value || emptyValue }}
    </p>
  </div>
</template>
<script>

export default {
  name: 'StaticField',

  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      required: true,
    },
    emptyValue: String,
  },
};
</script>
