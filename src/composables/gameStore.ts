import type GameState from '../../core/types/GameState.type'
import type { PlayerConfig } from '../types/PlayerConfig.type'
import WheelOfFortune from '../../core/WheelOfFortune'
import { getWordPuzzlesForGame } from '../services/wordPuzzle'
import { ref, computed } from 'vue'

let wheelOfFortune: null | WheelOfFortune = null
const gameState = ref<GameState | null>(null)

function useGameStore() {
  return {
    gameState: computed(() => gameState.value),
    startGame(playersConfig: PlayerConfig[]) {
      return getWordPuzzlesForGame().then((wordPuzzles) => {
        wheelOfFortune = new WheelOfFortune(
          playersConfig.map(player => player.name) as [string, string, string, string],
          wordPuzzles
        )

        gameState.value = wheelOfFortune.getState()
      })
    }
  }
}

export default useGameStore