<template>
  <div class="borad">
    <BoardLine
      v-for="line in board"
      class="borad__line"
      :key="line.join('')"
      :line="line"
    />
  </div>
</template>

<script setup lang="ts">
import BoardLine from '@/components/BoardLine.vue';
import { computed } from 'vue';

const board = computed(() => {
  return [
    '___________'.split(''),
    '_____________'.split(''),
    '_____________'.split(''),
    '___________'.split('')
  ];
});
</script>

<style lang="scss">
.borad {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__line {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}
</style>