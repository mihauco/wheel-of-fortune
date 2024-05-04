<template>
  <div>
    <h1>{{ $t('views.playersView.title') }}</h1>
    <CreatePlayerCard
      v-for="(playerConfig, index) in playersConfig"
      :key="index"
      v-model:player-config="playerConfig.value"
    />
    <button @click="startGameButtonClick">{{ $t('views.playersView.startGame') }}</button>
  </div>
</template>

<script setup lang="ts">
import CreatePlayerCard from '@/components/CreatePlayerCard.vue';
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import usePlayersConfig from '@/composables/playersConfig';
import useGameStore from '@/composables/gameStore';

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