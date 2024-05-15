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
      <Wheel
        v-if="showWheel"
        class="game-view__wheel"
        @spin-end="wheelSpinEnd"
      />
      <LetterSelect
        v-if="guessLetter"
        :type="guessLetter"
        class="game-view__letter-select"
        @select-end="letterSelectEnd"
      />
    </div>
    <div
      v-if="showTurnActions && currentPlayerConfig"
      class="game-view__turn-actions"
    >
      <PlayerCard
        :player-config="currentPlayerConfig"
        :small="true"
      />
      <TurnMoves
        @player-move="playerMove"
      />
    </div>
    <div
      v-else
      class="game-view__players"
    >
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
import { ref, onMounted, computed } from 'vue'
import usePlayersConfig from '@/composables/playersConfig';
import useGameStore from '@/composables/gameStore';
import sleep from '@/utils/sleep';
import PlayerCard from '@/components/PlayerCard.vue';
import Board from '@/components/Board.vue';
import Host from '@/components/Host.vue';
import TurnMoves from '@/components/TurnMoves.vue';
import Wheel from '@/components/Wheel.vue';
import LetterSelect from '@/components/LetterSelect.vue';

const router = useRouter()
const { t: $t } = useI18n()
const { playersConfig } = usePlayersConfig()
const { gameState, updateGameState, currentPuzzle, currentCategory } = useGameStore()
const showBoard = ref(false)
const introDone = ref(false)
const showTurnActions = ref(false)
const hostText = ref('')
const showWheel = ref(false)
const guessLetter = ref<'vowel' | 'consonant' | null>(null)
const currentPlayerConfig = computed(() => {
  return typeof gameState.value?.currentPlayerIndex === 'number'
    ? playersConfig[gameState.value.currentPlayerIndex].value : null
})

const hostTextEnd = () => {hostTextEndCallback && hostTextEndCallback()}
const playerMove = (action: 'SPIN') => {playerMoveCallback && playerMoveCallback(action)}
const wheelSpinEnd = (result: null | 'PRIZE' | 'LOSE_TURN' | 'BANKRUPT' | number) => {wheelSpinEndCallback && wheelSpinEndCallback(result)}
const letterSelectEnd = (hits: number) => { letterSelectEndCallback && letterSelectEndCallback(hits) }
let hostTextEndCallback: (() => void) | null = null
let playerMoveCallback: ((action: 'SPIN') => void) | null = null
let wheelSpinEndCallback: ((result: null | 'PRIZE' | 'LOSE_TURN' | 'BANKRUPT' | number) => void) | null = null
let letterSelectEndCallback: ((hits: number) => void) | null = null

const waitForHostToFinishTalking = () => {
  return new Promise((resolve) => {
    hostTextEndCallback = () => {
      hostTextEndCallback = null
      resolve(true)
    }
  })
}

const waitForPlayerToMakeMove = () => {
  return new Promise((resolve) => {
    playerMoveCallback = (action) => {
      playerMoveCallback = null
      resolve(action)
    }
  })
}

const waitForWheelToFinishSpinning = () => {
  return new Promise((resolve) => {
    wheelSpinEndCallback = (result) => {
      wheelSpinEndCallback = null
      resolve(result)
    }
  })
}

const waitForPlayerToSelectLetter = () => {
  return new Promise((resolve) => {
    letterSelectEndCallback = (hits) => {
      letterSelectEndCallback = null
      resolve(hits)
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

const runRound = async (roundIndex: 0 | 1 | 2 | 3 | 4) => {
  hostText.value = $t('views.gameView.hostTexts.round1')
  await waitForHostToFinishTalking()
  showBoard.value = true
  await sleep(1000);
  hostText.value = $t('views.gameView.hostTexts.category', { category: currentCategory.value })
  await waitForHostToFinishTalking()

  runNextTurn()
}

const runNextTurn = async () => {
  let isFirstMoveInPlayersTurn = true
  hostText.value = $t('views.gameView.hostTexts.playerTurn', { name: playersConfig[0].value.name })
  await waitForHostToFinishTalking()
  showTurnActions.value = true

  while (gameState.value?.currentPlayerPossibleMoves.length) {
    if (isFirstMoveInPlayersTurn) {
      hostText.value = $t('views.gameView.hostTexts.turn.first', { name: currentPlayerConfig?.value?.name })
    } else {
      hostText.value = $t('views.gameView.hostTexts.turn.next', { name: currentPlayerConfig?.value?.name })
    }

    isFirstMoveInPlayersTurn = false
    await waitForHostToFinishTalking()
    const move = await waitForPlayerToMakeMove()

    if (move === 'SPIN') {
      showWheel.value = true
      const result = await waitForWheelToFinishSpinning()
      if (result) {
        hostText.value = $t('views.gameView.hostTexts.spinSuccess', { result })
      } else {
        hostText.value = $t('views.gameView.hostTexts.spinFail')
      }
      await waitForHostToFinishTalking()
      showWheel.value = false
    } else if (move === 'GUESS_CONSONANT') {
      hostText.value = $t('views.gameView.hostTexts.gessConsonant')
      await waitForHostToFinishTalking()
      guessLetter.value = 'consonant'
      const hits = await waitForPlayerToSelectLetter()
      if (hits) {
        hostText.value = $t('views.gameView.hostTexts.guessConsonantSuccess', { hits })
      } else {
        hostText.value = $t('views.gameView.hostTexts.guessConsonantFail')
      }
      guessLetter.value = null
      await waitForHostToFinishTalking()
    } else if (move === 'GUESS_PHRASE') {
      // handle phrase guess
    }

    updateGameState()
  }
}

if (!gameState.value) {
  router.push('/')
} else {
  onMounted(async () => {
    await runIntro()
    introDone.value = true
    await runRound(0)
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

    &__turn-actions {
      flex: 0 1 auto;
      display: grid;
      grid-template-columns: 1fr 3fr;
      gap: 1rem;
    }
  }
</style>