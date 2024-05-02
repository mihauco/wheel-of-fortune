<template>
  <RouterView />
  <footer>
    &copy; 2024 mihau.co
  </footer>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="scss">
  .footer {
    color: #ddd;
  }
</style>
