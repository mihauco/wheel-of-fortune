<template>
  <div class="turn-moves card-wrapper">
    <div class="turn-moves__title">
      {{ $t('components.turnMoves.title') }}
    </div>
    <div class="turn-moves__buttons">
      <Button
        v-for="button in buttons"
        :small="true"
        @click="handleMoveButtonClick(button.move)"
      >
        {{ button.label }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, defineEmits } from 'vue';
import type PlayerMove from 'core/types/PlayerMove';
import useGameStore from '@/composables/gameStore';
import Button from '@/components/Button.vue';

const { t: $t } = useI18n();
const { gameState } = useGameStore();

const emit = defineEmits<{
  playerMove: [ PlayerMove ]
}>();

const buttons = computed(() => {
  return gameState.value?.currentPlayerPossibleMoves.map(move => {
    return {
      label: $t(`components.turnMoves.moves.${move}`),
      move
    }
  })
})

const handleMoveButtonClick = (move: PlayerMove) => {
  emit('playerMove', move);
}
</script>

<style lang="scss">
.turn-moves {
  padding: 1rem;

  &__title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: .5rem;
  }

  &__buttons {
    display: flex;
  }
}
</style>