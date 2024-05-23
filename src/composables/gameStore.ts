import type GameState from 'core/types/GameState.type'
import type { PlayerConfig } from '@/types/PlayerConfig.type'
import type PlayerMove from 'core/types/PlayerMove.type'
import WheelOfFortune from 'core/WheelOfFortune'
import { getWordPuzzlesForGame } from '../services/wordPuzzle'
import { ref, computed } from 'vue'
import wheelFields from '@/data/wheelFields'

let wheelOfFortune: null | WheelOfFortune = null
const gameState = ref<GameState | null>(null)

function useGameStore() {
  return {
    gameState: computed(() => gameState.value),
    updateGameState() {
      if (wheelOfFortune) {
        gameState.value = wheelOfFortune.getState()
      }
    },
    currentPuzzle: computed(() => {
      if (gameState.value) {
        return gameState.value.rounds[gameState.value.currentRoundIndex].displayWord
      }

      return ''
    }),
    currentCategory: computed(() => {
      if (gameState.value) {
        return gameState.value.rounds[gameState.value.currentRoundIndex].puzzle.category
      }

      return ''
    }),
    currentPlayerPossibleMoves: computed(() => {
      if (gameState.value) {
        return gameState.value.currentPlayerPossibleMoves
      }

      return []
    }),
    playersPoints: computed(() => {
      if (gameState.value) {
        console.log(gameState.value.players.map(player => player.points));
        return gameState.value.players.map(player => player.points)
      }

      return []
    }),
    spinTheWheel(successfullSpinProbability: number) {
      if (wheelOfFortune && gameState.value) {
        const drawnWheelFieldIndex = wheelOfFortune.makeMove(gameState.value.currentPlayerIndex, 'SPIN', {successfullSpinProbability})
        return drawnWheelFieldIndex
      }

      return null
    },
    guessConsonant(consonant: string) {
      if (wheelOfFortune && gameState.value) {
        const hits = wheelOfFortune.makeMove(gameState.value.currentPlayerIndex, 'GUESS_CONSONANT', {guess: consonant})
        return hits
      }

      return 0
    },
    buyVowel(vowel: string) {
      if (wheelOfFortune && gameState.value) {
        const hits = wheelOfFortune.makeMove(gameState.value.currentPlayerIndex, 'BUY_VOWEL', {guess: vowel})
        return hits
      }

      return 0
    },
    playerPass() {
      if (wheelOfFortune && gameState.value) {
        wheelOfFortune.makeMove(gameState.value.currentPlayerIndex, 'PASS')
      }
    },
    solve(guess: string) {
      if (wheelOfFortune && gameState.value) {
        return wheelOfFortune.makeMove(gameState.value.currentPlayerIndex, 'SOLVE', {guess})
      }

      return false
    },
    wheel: computed(() => gameState.value?.wheel),
    startGame(playersConfig: PlayerConfig[]) {
      return getWordPuzzlesForGame().then((wordPuzzles) => {
        wheelOfFortune = new WheelOfFortune({
          playerNames: playersConfig.map(player => player.name) as [string, string, string, string],
          wordPuzzleDictionary: wordPuzzles,
          wheel: wheelFields.map(field => field.value)
        })

        gameState.value = wheelOfFortune.getState()
      })
    }
  }
}

export default useGameStore