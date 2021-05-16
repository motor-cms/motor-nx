<template>
  <div class="form-group" :class="{ 'has-danger': errorMessage }">
    <label :for="id">
      {{ label }}
    </label>
    <input
      :type="type"
      :id="id"
      class="form-control"
      :name="name"
      :value="inputValue"
      :class="{ 'is-invalid': errorMessage }"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p class="text-danger" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useField } from 'vee-validate'

export default defineComponent({
  name: 'InputField',
  props: {
    id: String,
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(<string>props.name, undefined, {
      initialValue: <string>props.value,
    })
    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    }
  },
})
</script>
