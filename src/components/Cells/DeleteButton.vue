<template>
  <div class="inline">
    <button @click="askForConfirmation" class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
      {{ options.name }}
    </button>
    <delete-confirmation :active="active" :record="record" @cancel="cancel" @confirm="confirm"></delete-confirmation>
  </div>
</template>
<script>
import DeleteConfirmation from "@/components/Modals/DeleteConfirmation";

export default {
  name: 'DeleteButton',
  props: {
    options: Object,
    record: Object,
    resource: String,
  },
  components: {
    DeleteConfirmation
  },
  emits: ['submitCell'],
  data() {
    return {
      active: false,
    };
  },
  methods: {
    askForConfirmation() {
      this.active = true
    },
    cancel() {
      this.active = false;
    },
    confirm() {
      this.active = false;
      this.$emit('submit', { component: 'DeleteButton', record: this.record.id, resource: this.resource});
    }
  }
};
</script>
