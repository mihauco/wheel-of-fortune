<template>
  <GameOverlay>
    <div class="wheel card-wrapper">
      <div class="wheel__pointer" />
      <div
        class="wheel__wrapper"
        :style="{
          transform: `rotate(${tilt}deg)`
        }"
      >
        <div
          class="wheel__of-fortune"
          :style="{
            transform: `rotate(${spinDegrees}deg)`,
            transitionDuration: `${spinTime}s`
          }"
        >
          <template v-for="(field, index) in wheelFields">
            <div
              class="wheel__line"
              :style="{
                transform: `translate(-50%, -100%) rotate(${index * fieldDegrees}deg)`
              }"
            />
            <div
              class="wheel__field-background"
              :style="{
                transform: `translate(0, -100%) rotate(${index * fieldDegrees}deg)`,
                borderLeftColor: field.background || '',
                borderLeftWidth: `${fieldWidth}rem`
              }"
            />
            <div
              class="wheel__field-text"
              :style="{
                transform: `translate(-50%, -100%) rotate(${(index + 0.5) * fieldDegrees}deg)`,
                width: `${fieldWidth}rem`
              }"
            >
              <div
                v-for="letter in (field.label ? $t(field.label) : `${field.value}`)" :key="letter"
                class="wheel__field-letter"
              >
                {{ letter }}
              </div>
            </div>
          </template>
          <div class="wheel__cut"/>
        </div>
      </div>
      <div class="wheel__spin-bar">
        <div
          class="wheel__spin-pointer"
          :style="{left: `${spinPointerPosition}%`}"
        />
      </div>
      <div class="wheel__spin-info" v-html="$t('components.wheel.spinInfo')"/>
    </div>
  </GameOverlay>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import useGameStore from '@/composables/gameStore'
import GameOverlay from '@/components/GameOverlay.vue'
import wheelFields from '@/data/wheelFields'
import type WheelField from 'core/types/WheelField.type'

const { t: $t } = useI18n()
const { spinTheWheel } = useGameStore()
const emit = defineEmits<{
  spinEnd: [WheelField | null]
}>();
const wheelRadiusInRem = 14.5;
const fieldDegrees = 360 / wheelFields.length
const fieldWidth = Math.tan(fieldDegrees * Math.PI / 180) * wheelRadiusInRem
const tilt = fieldDegrees * -0.5
const spinDegrees = ref(0)
const spinTime = ref(0)

let spinPointerDirection = 1;
let stopSpinPointer = false
const spinPointerPosition = ref(50);

const slideSpinPointer = () => {
  if (stopSpinPointer) return

  spinPointerDirection = spinPointerPosition.value === 0
    ? 1 : spinPointerPosition.value === 100 ? -1 : spinPointerDirection
  spinPointerPosition.value += spinPointerDirection

  setTimeout(() => {
    slideSpinPointer()
  }, 5)
}

const resetValues = () => {
  stopSpinPointer = false
  spinPointerPosition.value = 50
  spinTime.value = 0
  spinDegrees.value = 0
}

const spacebarHandler = (event: KeyboardEvent) => {
  if (event.key === ' ') {
    stopSpinPointer = true

    document.body.removeEventListener('keydown', spacebarHandler)

    const drawnValue = Math.abs(spinPointerPosition.value - 50)
    let successfullSpinProbability = 1

    if (drawnValue > 5) {
      if (drawnValue > 45) {
        successfullSpinProbability = 0
      } else if (drawnValue > 40) {
        successfullSpinProbability = 0.2
      } else if (drawnValue > 30) {
        successfullSpinProbability = 0.4
      } else if (drawnValue > 20) {
        successfullSpinProbability = 0.6
      } else {
        successfullSpinProbability = 0.8
      }
    }

    
    const drawnFieldIndex = spinTheWheel(successfullSpinProbability)

    if (drawnFieldIndex) {
      const drawnField = wheelFields[drawnFieldIndex]

      spinTime.value = 5
      spinDegrees.value = 360 - drawnFieldIndex * fieldDegrees + 360;

      setTimeout(() => {
        emit('spinEnd', drawnField.value)
      }, 5100)
    } else {
      spinTime.value = 2
      spinDegrees.value = 360 * successfullSpinProbability

      setTimeout(() => {
        emit('spinEnd', null)
      }, 5100)
    }
  }
}

onMounted(() => {
  resetValues()
  slideSpinPointer()
  document.body.addEventListener('keydown', spacebarHandler)
})

</script>

<style lang="scss">
$wheelRadius: 14.5rem;

.wheel {
  width: calc(#{$wheelRadius} * 2 + 4rem);
  background: #fff;
  border: 0.1rem solid #000;
  padding: 1rem 2rem 2rem;

  &__of-fortune {
    width: calc(#{$wheelRadius} * 2);
    height: calc(#{$wheelRadius} * 2);;
    border-radius: 50%;
    border: 0.1rem solid #000;
    overflow: hidden;
    position: relative;
    transition-timing-function: easeInOutBack;
    transition-property: transform;
  }

  &__cut {
    width: calc(#{$wheelRadius} * 0.6);
    height: calc(#{$wheelRadius} * 0.6);
    background-color: var(--main-color);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 30;
  }

  &__line {
    width: 0.1rem;
    height: $wheelRadius;
    background-color: #000;
    transform-origin: center bottom;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
  }

  &__field-background {
    width: 0;
    height: 0;
    border-bottom-style: solid;
    border-left-style: solid;
    border-bottom-color: transparent;
    border-bottom-width: $wheelRadius;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: left bottom;
  }

  &__field-text {
    height: $wheelRadius;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center bottom;
    z-index: 20;
    padding-top: 1rem;
  }

  &__field-letter {
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    font-size: calc(#{($wheelRadius)} * 0.075);
  }

  &__pointer {
    height: 1rem;
    width: 100%;
    position: relative;
    z-index: 50;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0; 
      height: 0; 
    }

    &::before {
      border-left: .6rem solid transparent;
      border-right: .6rem solid transparent;
      border-top: 2rem solid #000;
    }

    &::after {
      top: .1rem;
      border-left: .4rem solid transparent;
      border-right: .4rem solid transparent;
      border-top: 1.6rem solid #fff;
    }
  }

  &__spin-bar {
    margin-top: 1rem;
    width: 100%;
    height: 2rem;
    border: 0.1rem solid #000;
    position: relative;
  }

  &__spin-pointer {
    width: .4rem;
    height: 100%;
    background: #000;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
  }

  &__spin-info {
    margin-top: 1rem;
  }
}
</style>