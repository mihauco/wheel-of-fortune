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
      v-if="prizeToShow || textToShow"
      class="game-view__neon"
    >
      <NeonPrize
        v-if="prizeToShow"
        :prize="prizeToShow"
      />
      <NeonText
        v-else-if="textToShow"
        :text="textToShow"
      />
    </div>
    <div
      v-else-if="showBoard"
      class="game-view__board"
    >
      <Board
        @letter-animation-end="boardLetterAnimationEnd"
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
      <Solve
        v-if="showSolve"
        class="game-view__solve"
        @solve-end="solveEnd"
      />
    </div>
    <div
      v-if="showTurnActions && currentPlayerConfig"
      class="game-view__turn-actions"
    >
      <PlayerCard
        :player-config="currentPlayerConfig"
        :points="currentPlayerPoints"
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
        :points="playersPoints[index]"
        :small="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref, onMounted, computed } from 'vue'
import type PlayerMove from 'core/types/PlayerMove.type';
import usePlayersConfig from '@/composables/playersConfig';
import useGameStore from '@/composables/gameStore';
import sleep from '@/utils/sleep';
import tKeyRandom from '@/utils/tKeyRandom';
import PlayerCard from '@/components/PlayerCard.vue';
import Board from '@/components/Board.vue';
import Host from '@/components/Host.vue';
import TurnMoves from '@/components/TurnMoves.vue';
import Wheel from '@/components/Wheel.vue';
import LetterSelect from '@/components/LetterSelect.vue';
import Solve from '@/components/Solve.vue';
import NeonPrize from '@/components/NeonPrize.vue';
import NeonText from '@/components/NeonText.vue';

const router = useRouter()
const { t: $t } = useI18n()
const { playersConfig } = usePlayersConfig()
const { gameState, updateGameState, currentCategory, playersPoints, playerPass } = useGameStore()
const showBoard = ref(false)
const introDone = ref(false)
const showTurnActions = ref(false)
const hostText = ref('')
const showWheel = ref(false)
const guessLetter = ref<'vowel' | 'consonant' | null>(null)
const showSolve = ref(false)
const prizeToShow = ref<null | string>(null)
const textToShow = ref<null | string>(null)
const currentPlayerConfig = computed(() => {
  return typeof gameState.value?.currentPlayerIndex === 'number'
    ? playersConfig[gameState.value.currentPlayerIndex].value : null
})
const currentPlayerPoints = computed(() => {
  return typeof gameState.value?.currentPlayerIndex === 'number'
    ? playersPoints.value[gameState.value.currentPlayerIndex] : 0
})

const hostTextEnd = () => {hostTextEndCallback && hostTextEndCallback()}
const playerMove = (action: 'SPIN') => {playerMoveCallback && playerMoveCallback(action)}
const wheelSpinEnd = (result: null | 'PRIZE' | 'LOSE_TURN' | 'BANKRUPT' | number) => {wheelSpinEndCallback && wheelSpinEndCallback(result)}
const letterSelectEnd = (result: {hits: number | null, letter: string}) => { letterSelectEndCallback && letterSelectEndCallback(result) }
const boardLetterAnimationEnd = () => { boardLetterAnimationEndCallback && boardLetterAnimationEndCallback()}
const solveEnd = (result: boolean) => { solveEndCallback && solveEndCallback(result)}
let hostTextEndCallback: (() => void) | null = null
let playerMoveCallback: ((action: 'SPIN') => void) | null = null
let wheelSpinEndCallback: ((result: null | 'PRIZE' | 'LOSE_TURN' | 'BANKRUPT' | number) => void) | null = null
let letterSelectEndCallback: ((result: {hits: number | null, letter: string}) => void) | null = null
let boardLetterAnimationEndCallback: (() => void) | null = null
let solveEndCallback: ((result: boolean) => void) | null = null

const waitForHostToFinishTalking: () => Promise<true> = () => {
  return new Promise((resolve) => {
    hostTextEndCallback = () => {
      hostTextEndCallback = null
      resolve(true)
    }
  })
}

const waitForPlayerToMakeMove: () => Promise<PlayerMove> = () => {
  return new Promise((resolve) => {
    playerMoveCallback = (action) => {
      playerMoveCallback = null
      resolve(action)
    }
  })
}

const waitForWheelToFinishSpinning: () => Promise<number | 'LOSE_TURN' | 'BANKRUPT' | 'PRIZE' | null> = () => {
  return new Promise((resolve) => {
    wheelSpinEndCallback = (result) => {
      wheelSpinEndCallback = null
      resolve(result)
    }
  })
}

const waitForPlayerToSelectLetter: () => Promise<{hits: number | null, letter: string}> = () => {
  return new Promise((resolve) => {
    letterSelectEndCallback = ({hits, letter}) => {
      letterSelectEndCallback = null
      resolve({hits, letter})
    }
  })
}

const waitForBoardLetterAnimationEnd: () => Promise<true> = () => {
  return new Promise((resolve) => {
    boardLetterAnimationEndCallback = () => {
      boardLetterAnimationEndCallback = null
      resolve(true)
    }
  })
}

const waitForPlayerToFinishSolveTry: () => Promise<boolean> = () => {
  return new Promise((resolve) => {
    solveEndCallback = (result) => {
      solveEndCallback = null
      resolve(result)
    }
  })
}

const runIntro = async () => {
  hostText.value = $t(tKeyRandom('views.gameView.hostTexts.start'))
  await waitForHostToFinishTalking()
  await sleep(1000)
  hostText.value = $t(tKeyRandom('views.gameView.hostTexts.playersIntro[0]'), { players: playersConfig.map(player => player.value.name).join(', ')})
  await waitForHostToFinishTalking()
  await sleep(1000)
  hostText.value = $t(tKeyRandom('views.gameView.hostTexts.mainPrizeInfo'))
  await waitForHostToFinishTalking()
  prizeToShow.value = 'polonez'
  await sleep(1000)
  hostText.value = $t(tKeyRandom('views.gameView.hostTexts.ready'))
  await waitForHostToFinishTalking()
  prizeToShow.value = null
  await sleep(1000)
}

const runNextRound = async () => {
  const roundIndex = gameState.value?.currentRoundIndex || 0
  textToShow.value = $t(`views.gameView.neonTexts.round${roundIndex + 1}`)
  hostText.value = $t(tKeyRandom(`views.gameView.hostTexts.round${roundIndex + 1}`))
  await waitForHostToFinishTalking()
  await sleep(1000)
  textToShow.value = null
  showBoard.value = true
  hostText.value = $t(tKeyRandom('views.gameView.hostTexts.category'), { category: currentCategory.value })
  await waitForHostToFinishTalking()
  await sleep(1000)
  runNextTurn()
}

const runNextTurn = async () => {
  const playerIndex = gameState.value?.currentPlayerIndex || 0
  let isFirstMoveInPlayersTurn = true
  let roundFinished = false
  hostText.value = $t(tKeyRandom('views.gameView.hostTexts.playerTurn'), { name: currentPlayerConfig?.value?.name })
  await waitForHostToFinishTalking()
  await sleep(1000)
  showTurnActions.value = true

  while (gameState.value?.currentPlayerIndex === playerIndex) {
    if (isFirstMoveInPlayersTurn) {
      hostText.value = $t(tKeyRandom('views.gameView.hostTexts.turnFirstMove'), { name: currentPlayerConfig?.value?.name })
    } else {
      hostText.value = $t(tKeyRandom('views.gameView.hostTexts.turnAnotherMove'), { name: currentPlayerConfig?.value?.name })
    }
    isFirstMoveInPlayersTurn = false

    await waitForHostToFinishTalking()
    await sleep(1000)

    const move = await waitForPlayerToMakeMove()

    if (move === 'SPIN') {
      showWheel.value = true
      const result = await waitForWheelToFinishSpinning()

      if (result) {
        if (typeof result === 'number') {
          if (result === 0) {
            hostText.value = $t(tKeyRandom('views.gameView.hostTexts.spinZeroPoints'))
          } else {
            hostText.value = $t(tKeyRandom('views.gameView.hostTexts.spinPoints'), { points: result })
          }
        } else if (result === 'BANKRUPT') {
          hostText.value = $t(tKeyRandom('views.gameView.hostTexts.spinBankrupt'))
        } else if (result === 'LOSE_TURN') {
          hostText.value = $t(tKeyRandom('views.gameView.hostTexts.spinLoseTurn'))
        } else {
          hostText.value = $t(tKeyRandom('views.gameView.hostTexts.spinPrize'))
        }
      } else {
        hostText.value = $t(tKeyRandom('views.gameView.hostTexts.spinFail'))
      }
      await waitForHostToFinishTalking()
      await sleep(1000)
      showWheel.value = false
    } else if (move === 'GUESS_CONSONANT') {
      hostText.value = $t(tKeyRandom('views.gameView.hostTexts.guessConsonant'))
      await waitForHostToFinishTalking()
      await sleep(1000)
      guessLetter.value = 'consonant'
      const {hits, letter} = await waitForPlayerToSelectLetter()
      if (hits) {
        if (hits === 1) {
          hostText.value = $t(tKeyRandom('views.gameView.hostTexts.guessConsonantSuccess_one'), { letter })
        } else {
          hostText.value = $t(tKeyRandom('views.gameView.hostTexts.guessConsonantSuccess_many'), { hits, letter })
        }
      } else if (hits === null) {
        hostText.value = $t(tKeyRandom('views.gameView.hostTexts.guessConsonantAlreadyUsed'), { letter })
      } else {
        hostText.value = $t(tKeyRandom('views.gameView.hostTexts.guessConsonantFail'))
      }
      guessLetter.value = null
      await waitForHostToFinishTalking()
      sleep(1000)
    } else if (move === 'BUY_VOWEL') {
      hostText.value = $t(tKeyRandom('views.gameView.hostTexts.buyVowel'))
      await waitForHostToFinishTalking()
      await sleep(1000)
      guessLetter.value = 'vowel'
      const {hits, letter} = await waitForPlayerToSelectLetter()
      if (hits) {
        if (hits === 1) {
          hostText.value = $t(tKeyRandom('views.gameView.hostTexts.guessVowelSuccess_one'), { letter })
        } else {
          hostText.value = $t(tKeyRandom('views.gameView.hostTexts.guessVowelSuccess_many'), { hits, letter })
        }
      } else if (hits === null) {
        hostText.value = $t(tKeyRandom('views.gameView.hostTexts.guessVowelAlreadyUsed'), { letter })
      } else {
        hostText.value = $t(tKeyRandom('views.gameView.hostTexts.guessVowelFail'))
      }
      guessLetter.value = null
      await waitForHostToFinishTalking()
      sleep(1000)
    } else if (move === 'SOLVE') {
      hostText.value = $t(tKeyRandom('views.gameView.hostTexts.solve'))
      await waitForHostToFinishTalking()
      await sleep(1000)
      showSolve.value = true
      const isCorrect = await waitForPlayerToFinishSolveTry()
      showSolve.value = false
      hostText.value = $t(tKeyRandom('views.gameView.hostTexts.solveWait'))
      await waitForHostToFinishTalking()
      await sleep(1000)

      if (isCorrect) {
        hostText.value = $t(tKeyRandom('views.gameView.hostTexts.solveSuccess'))
        roundFinished = true
      } else {
        hostText.value = $t(tKeyRandom('views.gameView.hostTexts.solveFail'))
      }

      await waitForHostToFinishTalking()
      await sleep(1000)
    } else if (move === 'PASS') {
      hostText.value = $t(tKeyRandom('views.gameView.hostTexts.pass'))
      playerPass()
      await waitForHostToFinishTalking()
      await sleep(1000)
    }

    updateGameState()
  }

  showTurnActions.value = false

  if (roundFinished) {
    showBoard.value = false
    await runNextRound()
  } else {
    runNextTurn()
  }
}

if (!gameState.value) {
  router.push('/')
} else {
  onMounted(async () => {
    await runIntro()
    introDone.value = true
    await runNextRound()
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

    &__board,
    &__neon {
      flex: 1 0 auto;
    }

    &__neon {
      display: flex;
      justify-content: center;
      align-items: center;
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