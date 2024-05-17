<template>
  <div
    class="player-card card-wrapper"
    :class="{ 'player-card--small': small }"
  >
    <div class="player-card__avatar"></div>
    <div class="player-card__info">
      <template v-if="edit">
        <Input
          class="player-card__name-input"
          v-model="playerName"
        />
        <PlayerTypeSelect
          v-model="playerType"
        />
      </template>
      <template v-else>
        <div class="player-card__name">{{ playerName }}</div>
        <div
          v-if="points !== undefined"
          class="player-card__points"
        >
          {{ $t('components.playerCard.points', {points}) }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PlayerConfig } from '@/types/PlayerConfig.type'
import Input from '@/components/Input.vue'
import PlayerTypeSelect from '@/components/PlayerTypeSelect.vue'

const props = defineProps<{
  playerConfig: PlayerConfig,
  edit?: boolean,
  small?: boolean
  points?: number
}>()

const emit = defineEmits<{
  'update:playerConfig': [playerConfig: PlayerConfig]
}>()

const { t: $t } = useI18n()

const playerName = computed({
  get: () => props.playerConfig.name,
  set: (newName: string) => {
    if (props.edit) {
      emit('update:playerConfig', {
        type: props.playerConfig.type,
        name: newName
      })
    }
  }
})

const playerType = computed({
  get: () => props.playerConfig.type,
  set: (newType: 'human' | 'computer') => {
    if (props.edit) {
      emit('update:playerConfig', {
        type: newType,
        name: props.playerConfig.name
      })
    }
  }
})

</script>

<style lang="scss">
.player-card {
  padding: 2rem;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  &--small {
    padding: 1rem;
  }

  &__avatar {
    flex: 0 0 8rem;
    width: 8rem;
    height: 10rem;
    background-color: #ddd;
    margin-right: 2rem;

    .player-card--small & {
      flex: 0 0 5rem;
      width: 5rem;
      height: 6rem;
      margin-right: 1rem;
    }
  }

  &__info {
    flex: 1 1 auto;
  }

  &__name-input {
    margin-bottom: 2rem;
  }

  &__name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: .5rem;
  }

  &__points {
    font-size: 1rem;
  }
}
</style>

