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
          isImage(file.type)
            ? 'background-image:url(' +
              (file.dataUrl || inputValue?.conversions?.preview) +
              ');'
            : ''
        "
        v-on:dragover.prevent="handleDragOver"
        v-on:drop.prevent="handleDrop"
        v-on:dragleave.prevent="handleDragLeave"
        :class="{
          over: status.over,
        }"
      >
        <span v-if="file.dataUrl === '' && !inputValue?.conversions">
          {{ $t('motor-backend.global.drop_file_here') }}
        </span>
        <span v-if="!isImage(file.type)" style="overflow-wrap: anywhere">
          {{ file.type }}
        </span>
      </div>
      <div class="col-md-8" v-if="status.dropped || inputValue?.conversions">
        <button
          v-if="allowDelete"
          @click="deleteImage"
          class="btn btn-danger btn-sm align-content-end"
          type="button"
        >
          <fa icon="trash-alt" />
        </button>
        <p><strong>File:</strong> {{ file.name }}</p>
        <p>
          <strong>Type:</strong>
          {{ file.type }} kb
        </p>
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
  name: 'FileField',
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
    allowDelete: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    // Create a property that holds the file information
    const file = ref({
      name: '',
      size: 0,
      dataUrl: <any>'',
      type: '',
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
        type: fileItem.type,
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

    // Check mimetype before displaying an image
    const isImage = (type: string) => {
      const mimeTypes = [
        'image/apng',
        'image/avif',
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/svg+xml',
        'image/webp',
      ]

      return mimeTypes.indexOf(type) > -1
    }

    const deleteImage = () => {
      handleChange({ file: false })
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
          name: value.file_name,
          size: parseFloat((value.size / 1000).toFixed(2)),
          dataUrl: '',
          type: value.mime_type,
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
      isImage,
    }
  },
})
</script>
