<template>
  <div
    v-if="gameState"
    class="game-view"
  >
    <div class="game-view__host">
      <Host
        :text="hostText"
        @text-end="hostTextEnd"
      />
    </div>
    <div
      v-if="showBoard"
      class="game-view__board"
    >
      <Board
        :word-puzzle="currentPuzzle"
        :category="currentCategory"
      />
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
import { ref, onMounted } from 'vue'
import usePlayersConfig from '@/composables/playersConfig';
import useGameStore from '@/composables/gameStore';
import sleep from '@/utils/sleep';
import PlayerCard from '@/components/PlayerCard.vue';
import Button from '@/components/Button.vue';
import Board from '@/components/Board.vue';
import Host from '@/components/Host.vue';

const router = useRouter()
const { t: $t } = useI18n()
const { playersConfig } = usePlayersConfig()
const { gameState, currentPuzzle, currentCategory } = useGameStore()
const showBoard = ref(false)
const introDone = ref(false)
const hostText = ref('')

const hostTextEnd = () => {hostTextEndCallback && hostTextEndCallback()}
let hostTextEndCallback: (() => void) | null = null

const waitForHostToFinishTalking = () => {
  return new Promise((resolve) => {
    hostTextEndCallback = () => {
      hostTextEndCallback = null
      resolve(true)
    }
  })
}

const runIntro = async () => {
  hostText.value = $t('views.gameView.hostTexts.start[0]')
  await waitForHostToFinishTalking()
  await sleep(1000);
  hostText.value = $t('views.gameView.hostTexts.playersIntro[0]', { players: playersConfig.map(player => player.value.name).join(', ')})
  await waitForHostToFinishTalking()
  await sleep(1000);
  hostText.value = $t('views.gameView.hostTexts.mainPrizeInfo')
  await waitForHostToFinishTalking()
  await sleep(1000);
  hostText.value = $t('views.gameView.hostTexts.ready')
  await waitForHostToFinishTalking()
  await sleep(1000);
}

const runRound1 = async () => {
  hostText.value = $t('views.gameView.hostTexts.round1')
  await waitForHostToFinishTalking()
  showBoard.value = true
  hostText.value = $t('views.gameView.hostTexts.category', { category: currentCategory.value })
}

if (!gameState.value) {
  router.push('/')
} else {
  onMounted(async () => {
    await runIntro()
    introDone.value = true
    await runRound1()
  })
}
</script>

<style lang="scss">
  .game-view {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    flex-direction: column;

    &__host {
      flex: 0 0 auto;
      margin-bottom: 2rem;
    }

    &__board {
      flex: 1 0 auto;
    }

    &__players {
      margin-top: auto;
      flex: 0 1 auto;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }
  }
</style>