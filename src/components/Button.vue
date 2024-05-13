<template>
  <button
    class="button"
    @click="clickHandler"
    :disabled="props.disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineEmits } from 'vue'

const router = useRouter()

const props = defineProps<{
  to?: string,
  disabled?: boolean
}>()

const emit = defineEmits<{
  click: [MouseEvent]
}>()

const clickHandler = (event: MouseEvent) => {
  if (props.disabled) return

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
  font-size: 1.4rem;
  border: none;
  background-color: silver;
  box-shadow: inset -0.2rem -0.2rem #0a0a0a,
    inset 0.2rem 0.2rem #f5f5f5,
    inset -0.4rem -0.4rem grey,
    inset 0.4rem 0.4rem #dfdfdf;

  &:active {
    box-shadow: inset -0.2rem -0.2rem #f5f5f5,
      inset 0.2rem 0.2rem #0a0a0a,
      inset -0.4rem -0.4rem #dfdfdf,
      inset 0.4rem 0.4rem grey;
  }

  &:disabled {
    color: grey;
    text-shadow: 1px 1px 0 #fff;
  }
}
</style>