<template>
  <div class="intro">
    <Title />
    <div class="intro__action-buttons">
      <Button class="intro__action-button" to="/players">{{ $t('views.introView.playGame') }}</Button>
      <Button class="intro__action-button" to="/credits">{{ $t('views.introView.credits') }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import Title from '@/components/Title.vue'
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()
</script>

<style lang="scss">
  .intro {
    height: 100%;

    &__title {
      font-size: 48px;
      font-weight: bold;
      text-align: center;
    }

    &__action-buttons {
      display: flex;
      flex-direction: column;
      width: 20rem;
      margin: 10rem auto;
    }

    &__action-button {
      margin-bottom: 2rem;
      width: 100%;
    }
  }
</style>