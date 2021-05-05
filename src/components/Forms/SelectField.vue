<template>
  <div class="relative w-full mb-3">
    <label :for="id" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
      {{ label }}
    </label>
    <select
        :id="id"
        :name="name"
        :value="inputValue"
        @input="handleChange"
        @blur="handleBlur"
        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
    </select>
    <p class="text-red-500" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>

</template>
<script>

import {useField} from "vee-validate";

export default {
  name: 'SelectField',

  props: {
    id: String,
    value: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    options: Array,
  },
  setup(props) {
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    });
    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
};
</script>
