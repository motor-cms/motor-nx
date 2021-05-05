<template>
  <select v-model="value" @change="$emit('submit', { parameter: options.parameter, value: value})"
          class="mx-4 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline lg:w-3/12"
  >
    <option value="" v-if="options.emptyOption">{{ options.emptyOption }}</option>
    <option v-for="option in selectOptions" :key="option.value" :value="option.value">{{ option.name }}</option>
  </select>
</template>
<script>

export default {
  name: 'SelectFilter',
  props: {
    options: Object
  },
  data() {
    return {
      value: '',
      selectOptions: []
    };
  },
  emits: ['submit'],
  async created() {

    this.selectOptions = await Promise.resolve(this.options.options).then(result => { return result});
  }
};
</script>
