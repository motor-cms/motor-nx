<template>
  <div class="form-group" :class="{ 'has-danger': errorMessage }">
    <label :for="id">
      {{ label }}
    </label>
    <div class="d-none">
      <input :id="id" type="file" :name="name" />
    </div>
    <div class="row" style="padding-left: 0.75rem">
      <div
        class="col-md-4 drop-zone"
        :style="
          'background-image:url(' +
          (file.dataUrl || inputValue?.conversions?.preview) +
          ');'
        "
        v-on:dragover.prevent="handleDragOver"
        v-on:drop.prevent="handleDrop"
        v-on:dragleave.prevent="handleDragLeave"
        :class="{
          over: status.over,
        }"
      >
        <span v-if="file.dataUrl === '' && !inputValue?.conversions">
          DROP FILE HERE
        </span>
      </div>
      <div class="col-md-8" v-if="status.dropped || inputValue?.conversions">
        <button
          @click="deleteImage"
          class="btn btn-danger btn-sm align-content-end"
          type="button"
        >
          <fa icon="trash-alt" />
        </button>
        <p><strong>File:</strong> {{ file.name }}</p>
        <p>
          <strong>Size:</strong>
          {{ file.size }} kb
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useField } from 'vee-validate'

export default defineComponent({
  name: 'ImageField',
  props: {
    id: String,
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: Object,
      default: () => {},
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    cssClass: {
      type: String,
      default: '',
    },
  },
  // mounted() {
  //   if (this.value.conversions) {
  //     this.file.name = this.value.file_name
  //     this.file.size = parseFloat((this.value.size / 1000).toFixed(2))
  //   }
  // },
  setup(props) {
    // Create a property that holds the file information

    const file = ref({
      name: '',
      size: 0,
      dataUrl: <any>'',
    })
    // Add the drag and drop status as an object
    const status = ref({
      over: false,
      dropped: false,
    })

    const handleDragOver = () => {
      status.value.over = true
    }

    const handleDragLeave = () => {
      status.value.over = false
    }

    const handleDrop = (event: any) => {
      status.value.dropped = true
      status.value.over = false
      const fileItem = event.dataTransfer.items[0].getAsFile()

      const fileInput = <HTMLInputElement>(
        document.getElementById(props.id.toString())
      )
      fileInput.files = event.dataTransfer.files

      file.value = {
        name: fileItem.name,
        size: parseFloat((fileItem.size / 1000).toFixed(2)),
        dataUrl: '',
      }

      const reader = new FileReader()
      // Read the file's content as base64 encoded string, represented by a url
      reader.readAsDataURL(fileItem)

      // Wait for the browser to finish reading and fire the onloaded-event:
      reader.onloadend = (event) => {
        // Take the reader's result and use it for the next method
        const fileResult = event.target.result
        file.value.dataUrl = fileResult
        handleChange({ file: fileResult })
      }
    }

    const deleteImage = () => {
      handleChange({ file: false })
      // console.log('delete me biatch')
    }

    const test = (e: any) => {
      console.log(e)
    }

    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(<string>props.name, undefined, {
      initialValue: props.value,
    })

    watch(inputValue, (value) => {
      if (value && !value.file) {
        file.value = {
          name: value.name,
          size: parseFloat((value.size / 1000).toFixed(2)),
          dataUrl: '',
        }
      }
    })

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
      file,
      status,
      deleteImage,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      test,
    }
  },
})
</script>
