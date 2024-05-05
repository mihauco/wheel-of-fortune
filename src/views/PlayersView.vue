<template>
  <div class="players-view">
    <div class="players-view__header">
      <div class="players-view__title">
        {{ $t('views.playersView.title') }}
      </div>
      <Button @click="startGameButtonClick">{{ $t('views.playersView.startGame') }}</Button>
    </div>
    <div class="players-view__players">
      <PlayerCard
        v-for="(playerConfig, index) in playersConfig"
        :key="index"
        :edit="true"
        v-model:player-config="playerConfig.value"
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

const router = useRouter()
const { t: $t } = useI18n()
const { playersConfig } = usePlayersConfig()
const { startGame } = useGameStore()

const startGameButtonClick = () => {
  startGame(playersConfig.map(playerConfig => playerConfig.value))
    .then(() => {
      router.push('/game')
    })
}
</script>

<style lang="scss">
  .players-view {
    height: 100%;
    display: flex;
    flex-direction: column;

    &__header {
      flex: 0 1 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    &__title {
      font-size: 2.4rem;
      font-weight: bold;
    }

    &__players {
      flex: 1 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 3rem;
    }
  }
</style>