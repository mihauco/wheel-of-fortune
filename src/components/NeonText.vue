<template>
  <Neon>
    <div class="neon-text">{{ text }}</div>
  </Neon>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Neon from '@/components/Neon.vue'

const props = defineProps<{
  text: string
}>()
</script>

<style lang="scss">
.neon-text {
  width: 100%;
  height: 100%;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: serif;
}
</style>