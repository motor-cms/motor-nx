<template>
  <div class="relative w-full mb-3">
    <label :for="id" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
      {{ label }}
    </label>
    <input :id="id" type="checkbox"
           class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
           :name="name"
           :value="name"
           :checked="value"
           @input="handleChange(!value)"
    />
    <p class="text-red-500" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>
<script>

import {useField} from "vee-validate";


// CAVEAT: i don't really know WHY this is now working but apparently switching @input="handleChange(value)" to !value seemed to do the trick
// Better never touch this again!
export default {
  name: "CheckboxField",
  props: {
    // Field's own value
    id: String,
    value: {
      type: null,
    },
    label: String,
    name: {
      type: String,
    },
  },
  setup(props) {
    const {
      checked, handleChange, errorMessage,
    } = useField(props.name, undefined, {
      type: 'checkbox',
      valueProp: props.value,
    });

    // select/unselect the input
    handleChange(props.value);

    return {
      checked, // readonly
      handleChange,
      errorMessage
    };
  },
};
</script>
