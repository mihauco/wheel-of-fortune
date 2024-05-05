<template>
  <div class="player-type-select">
    <div class="player-type-select__option">
      <input
        class="player-type-select__radio"
        type="radio"
        v-model="playerType"
        value="human"
        :id="`human-${playerId}`"
        :name="`playerType-${playerId}`"
      />
      <label
        class="player-type-select__label player-type-select__label--human"
        :for="`human-${playerId}`"
      >
        {{ $t('components.playerTypeSelect.human') }}
      </label>
    </div>
    <div class="player-type-select__option">
      <input
        class="player-type-select__radio"
        type="radio"
        v-model="playerType"
        value="computer"
        :id="`computer-${playerId}`"
        :name="`playerType-${playerId}`"
      />
      <label
        class="player-type-select__label player-type-select__label--computer"
        :for="`computer-${playerId}`"
      >
        {{ $t('components.playerTypeSelect.computer') }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import createUniqueRandomString from '@/utils/createUniqueRandomString'

const { t: $t } = useI18n()

const props = defineProps<{
  id?: string,
  modelValue: 'human' | 'computer'
}>()

const emit = defineEmits<{
  'update:modelValue': [playerType: 'human' | 'computer']
}>()

const playerType = computed({
  get: () => props.modelValue,
  set: (newType: 'human' | 'computer') => {
    emit('update:modelValue', newType)
  }
})

const playerId = ref(props.id || createUniqueRandomString())
</script>

<style lang="scss">
.player-type-select {
  display: flex;

  &__option {
    width: 50%;
  }

  &__radio {
    display: none;

    &:checked + .player-type-select__label {
      border-color: var(--main-color);
    }
  }

  &__label {
    cursor: pointer;
    display: flex;
    width: 100%;
    height: 3rem;
    padding: .5rem 1rem .5rem 3rem;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.4rem;
    border: 1px solid transparent;
    

    &::before {
      content: '';
      position: absolute;
      width: 2rem;
      height: 2rem;
      top: .5rem;
      left: .5rem;
      background-size: contain;
    }

    &--human::before {
      background-image: var(--human-icon);
    }
  }
}
</style>