<template>
  <Neon>
    <img
      class="neon-prize"
      :src="prizeImage"
    >
  </Neon>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Neon from '@/components/Neon.vue'

const props = defineProps<{
  prize: string
}>()

const prizeImage = computed<string>(() => {
  console.log(props.prize)
  if (props.prize === 'polonez') {
    return '/polonez.png?url'
  }

  return ''
})
</script>

<style lang="scss">
.neon-prize {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
</style>