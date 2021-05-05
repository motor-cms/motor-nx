<template>
  <span
      :style="{backgroundColor: record.event_type.web_color}"
    class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-emerald-200 uppercase last:mr-0 mr-1">
  {{ record.event_type.name }}
  </span>
</template>
<script>

export default {
  name: 'EventType',
  props: {
    options: Object,
    record: Object,
    prop: String,
  },
};
</script>
