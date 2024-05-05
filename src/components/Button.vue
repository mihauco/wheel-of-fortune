<template>
  <button class="button card-wrapper card-wrapper--hoverable" @click="clickHandler">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineEmits } from 'vue'

const router = useRouter()

const props = defineProps<{
  to?: string
}>()

const emit = defineEmits<{
  click: [void]
}>()

const clickHandler = (event) => {
  emit('click', event)

  if (props.to) {
    router.push(props.to)
  }
}
</script>

<style lang="scss">
.button {
  display: inline-block;
  height: 4rem;
  padding: 0 2rem;
  border-radius: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.4rem;
}
</style>