<template>
    <input type="text" v-model="term" @blur="$emit('submit', {parameter: 'search', value:term})" @keyup.enter="$event.target.blur()" placeholder="Search..." class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-32"/>
</template>
<script>

export default {
  name: 'SearchFilter',
  data() {
    return {
      term: '',
    };
  },
  emits: ['submit'],

};
</script>
