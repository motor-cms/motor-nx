<template>
  <div class="inline">
    <div class="w-16 h-5" :style="{ backgroundColor: record[prop] }"></div>
  </div>
</template>
<script>

export default {
  name: 'ColorBox',
  props: {
    options: Object,
    record: Object,
    prop: String,
  },
};
</script>
