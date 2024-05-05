import type { PlayerConfig } from '@/types/PlayerConfig.type'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'


const playersConfig: PlayerConfig[] = [
  { name: '', type: 'human' },
  { name: '', type: 'computer' },
  { name: '', type: 'computer' },
  { name: '', type: 'computer' }
]

let initialNamesSet = false

function usePlayersConfig() {
  const { t: $t } = useI18n()

  if (!initialNamesSet) {
    playersConfig[0].name = `${$t('global.player')} 1`
    for (let i = 1; i <= 3; i++) {
      let name = ''
    
      while (!name || playersConfig.some(player => player.name === name)) {
        name = $t(`global.fakeNames.${Math.floor(Math.random() * 6)}`)
      }
    
      playersConfig[i].name = name
    }

    initialNamesSet = true
  }

  return {
    playersConfig: [
      computed({
        get: () => playersConfig[0],
        set: (value: PlayerConfig) => { playersConfig[0] = value }
      }),
      computed({
        get: () => playersConfig[1],
        set: (value: PlayerConfig) => { playersConfig[1] = value }
      }),
      computed({
        get: () => playersConfig[2],
        set: (value: PlayerConfig) => { playersConfig[2] = value }
      }),
      computed({
        get: () => playersConfig[3],
        set: (value: PlayerConfig) => { playersConfig[3] = value }
      })
    ]
  }
}

export default usePlayersConfig