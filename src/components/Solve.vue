<template>
  <GameOverlay>
    <div class="solve card-wrapper">
      <div class="solve__title">
        {{ $t('components.solve.title') }}
      </div>
      <Input
        class="solve__input"
        v-model="guess"
      />
      <Button
        class="solve__button"
        @click="handleGuessClick"
        :disabled="!guess.trim()"
      >
        {{ $t('components.solve.buttonLabel') }}
      </Button>
    </div>
  </GameOverlay>
</template>

<script setup lang="ts">
import GameOverlay from '@/components/GameOverlay.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import { defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useGameStore from '@/composables/gameStore'

const { t: $t } = useI18n()
const emit = defineEmits<{
  solveEnd: [boolean]
}>()
const { solve } = useGameStore()
const guess = ref('')
const handleGuessClick = () => {
  const isCorrect = solve(guess.value)
  emit('solveEnd', isCorrect)
}
</script>

<style lang="scss">
.solve {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &__title {
    font-weight: bold;
    margin-bottom: 2rem;
  }

  &__input {
    width: 40rem;
    margin-bottom: 2rem;
  }

  &__button {
    width: 15rem;
  }
}
</style>