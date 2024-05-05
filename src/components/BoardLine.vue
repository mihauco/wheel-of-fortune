<template>
  <div class="board-line">
    <div
      v-for="char in line"
      v-key="char"
      class="board-line__tile"
    >
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
    width: 4rem;
    height: 5.5rem;
    background-color: #115911;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAACNJREFUGFdjnDdv3v+kpCRGBigA8cEcmASMRlEB04FdJTYzAdwIIbhcrs68AAAAAElFTkSuQmCC');

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
}
</style>