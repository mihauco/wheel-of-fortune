<template>
  <div class="board">
    <BoardLine
      v-for="(line, index) in board"
      class="board__line"
      :key="`${line.join('')}_${index}`"
      :line="line"
    />
    <div class="board__category">
      <span class="board__category-text">{{ props.category }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import BoardLine from '@/components/BoardLine.vue';
import { computed, defineEmits } from 'vue';
import puzzleToBoard from '@/utils/puzzleToBoard';

const props = defineProps<{
  wordPuzzle: string,
  category: string
}>();

const emit = defineEmits()

const board = computed(() => {
  return puzzleToBoard(props.wordPuzzle);
});
</script>

<style lang="scss">
.board {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__line {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  &__category {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 0.1rem;
      background-color: var(--main-color);
    }
  }

  &__category-text {
    padding: 0.5rem 1rem;
    border: 0.1rem solid var(--main-color);
    background-color: var(--main-background-color);
    font-size: 1.4rem;
    position: relative;
  }
}
</style>