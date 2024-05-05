<template>
  <div class="title">
    <template v-for="row in plTitle">
      <div
        v-for="letter in row"
        class="title__tile"
      >
        <div class="title__tile-inner">
          <span v-if="letter" class="title__letter">{{ letter }}</span>
        </div>
      </div>
      
    </template>
  </div>
</template>

<script setup lang="ts">
const plTitle = [
  [...(new Array(7).fill('')), 'K', 'O', 'Ł', 'O', ...(new Array(7).fill(''))],
  [...(new Array(6).fill('')), 'F', 'O', 'R', 'T', 'U', 'N', 'Y', ...(new Array(5).fill(''))]
]
</script>

<style lang="scss">
.title {
  display: grid;
  grid-template-columns: repeat(18, 1fr);
  gap: 1rem;
  width: 100%;

  &__tile {
    border: 0.1rem solid #000;
  }

  &__tile-inner {
    width: 100%;
    padding-bottom: 130%;
    position: relative;

    &:empty {
      background-color: #115911;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAACNJREFUGFdjnDdv3v+kpCRGBigA8cEcmASMRlEB04FdJTYzAdwIIbhcrs68AAAAAElFTkSuQmCC');
    }
  }

  &__letter {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }
}
</style>