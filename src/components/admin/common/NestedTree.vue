<template>
  <draggable
    class="dragArea"
    tag="ul"
    :list="tree"
    :group="{ name: 'g1' }"
    :move="checkMove"
    item-key="id"
  >
    <template #item="{ element }">
      <li>
        <p>{{ element.name }}</p>
        <nested-draggable :tree="element.children" :record="record" />
      </li>
    </template>
  </draggable>
</template>
<script lang="ts">
import draggable from 'vuedraggable'
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    tree: {
      required: true,
      type: Object,
    },
    record: {
      type: Number,
    },
  },
  components: {
    draggable,
  },
  name: 'nested-draggable',
  setup(props) {
    const checkMove = (event) => {
      if (
        event.draggedContext &&
        event.draggedContext.element.id !== props.record
      ) {
        return false
      }
    }
    return { checkMove }
  },
})
</script>
<style scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
</style>
