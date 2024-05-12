<template>
  <div class="game-overlay">
    <div class="game-overlay__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.game-overlay {
  position: absolute;
  top: 13rem;
  left: 3rem;
  right: 3rem;
  bottom: 5.3rem;
  background-image: var(--shadow-pattern-image-light);
  background-size: 0.3rem 0.3rem;
  background-repeat: repeat;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>