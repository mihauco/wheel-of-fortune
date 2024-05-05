<template>
  <div class="app">
    <main class="app__main">
      <RouterView />
    </main>
    <footer class="app__footer">
      &copy; 2024 mihau.co
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import setupRemBaseSetter from './utils/setupRemBaseSetter';

onMounted(() => {
  setupRemBaseSetter()
})
</script>

<style lang="scss">
  .app {
    height: 100vh;
    aspect-ratio: 4/3;
    background: #fff;
    margin: 0 auto;
    position: relative;
    padding: 3rem;
    display: flex;
    flex-direction: column;

    &__main {
      flex: 1 0 auto;
      padding-bottom: 3rem;
    }

    &__footer {
      flex: 0 0 auto;
      border-top: 0.1rem solid var(--main-color);
      padding: 1rem 0 0;
    }
  }
</style>
