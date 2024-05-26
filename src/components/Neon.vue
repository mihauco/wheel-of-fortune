<template>
  <div
    class="neon"
    :style="{
      width: `${widthRem}rem`,
      height: `${heightRem}rem`
    }"
  >
    <div
      v-for="bulb in bulbs"
      class="neon__bulb"
      :style="{
        top: `${bulb.top}rem`,
        left: `${bulb.left}rem`
      }"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed } from 'vue';

const props = withDefaults(
  defineProps<{width?: number, height?: number}>(),
  {
    width: 20,
    height: 13
  }
)

const widthRem = computed(() => props.width * 2 + 0.5)
const heightRem = computed(() => props.height * 2 + 0.5)

const bulbs = (() => {
  const length = 2 * (props.width + props.height) - 4
  let top = 0.5
  let left = 0.5

  return Array.from({ length }, (_, i) => {
    if (i > 0) {
      if (i <= props.width - 1) {
        left += 2
      } else if (i > props.width - 1 && i <= props.width - 1 + props.height - 1) {
        top += 2
      } else if (i > props.width - 1 + props.height - 1 && i <= 2 * (props.width - 1) + props.height - 1) {
        left -= 2
      } else {
        top -= 2
      }
    }

    return {top, left}
  })
})()
</script>

<style lang="scss">
.neon {
  background-color: var(--board-tile-color);
  position: relative;
  padding: 2.5rem;

  &__bulb {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    position: absolute;
    animation: neon .5s infinite normal;

    &:nth-child(2n) {
      animation-direction: reverse;
    }
  }

  @keyframes neon {
    0% {background-color: #ff0000;}
    49% {background-color: #ff0000;}
    51% {background-color: #0000ff;}
    100% {background-color: #0000ff;}
  }
}
</style>