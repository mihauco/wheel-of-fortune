<template>
  <div class="board-line">
    <div
      v-for="(char, index) in line"
      :key="`${char}_${index}`"
      class="board-line__tile"
      :class="{ 'board-line__tile--empty': char.trim() === '' }"
    >
      <div
        v-if="char.trim() !== ''"
        class="board-line__tile-char"
      >
        {{ char !== '_' ? char : '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  line: string[]
}>()
</script>

<style lang="scss">
.board-line {
  display: flex;
  align-items: center;
  justify-content: center;

  &__tile {
    width: 3.5rem;
    height: 4.5rem;
    position: relative;
    border: 1px solid var(--main-color);

    &--empty {
      background-color: var(--board-tile-color);
      background-image: var(--shadow-pattern-image);
    }

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }

  &__tile-char {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    font-size: 2rem;
    font-weight: bold;
    color: var(--main-color);
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
  }
}
</style>