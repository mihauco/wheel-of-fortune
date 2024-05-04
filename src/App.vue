<template>
  <div class="app">
    <RouterView />
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

    padding: 2rem;
  }
</style>
