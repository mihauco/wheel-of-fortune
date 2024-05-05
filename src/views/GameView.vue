<template>
  <div
    v-if="gameState"
    class="game-view"
  >
    <div class="game-view__board">
      <Board />
    </div>
    <div class="game-view__players">
      <PlayerCard
        v-for="(playerConfig, index) in playersConfig"
        :key="index"
        :player-config="playerConfig.value"
        :small="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import usePlayersConfig from '@/composables/playersConfig';
import useGameStore from '@/composables/gameStore';
import PlayerCard from '@/components/PlayerCard.vue';
import Button from '@/components/Button.vue';
import Board from '@/components/Board.vue';

const router = useRouter()
const { t: $t } = useI18n()
const { playersConfig } = usePlayersConfig()
const { gameState } = useGameStore()

if (!gameState.value) {
  router.push('/')
} else {
  console.log('ok')
}
</script>

<style lang="scss">
  .game-view {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    flex-direction: column;

    &__board {
      flex: 1 0 auto;
    }

    &__players {
      flex: 0 1 auto;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }
  }
</style>