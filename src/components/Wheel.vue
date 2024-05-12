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
          <template v-for="(field, index) in fields">
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
                v-for="letter in field.label" :key="letter"
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
import { ref, onMounted, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import GameOverlay from '@/components/GameOverlay.vue';

const { t: $t } = useI18n();
const emit = defineEmits<{
  spinEnd: [null | 'PRIZE' | 'LOSE_TURN' | 'BANKRUPT' | number]
}>();

const wheelRadiusInRem = 14.5;

const fields: {value: 'PRIZE' | 'LOSE_TURN' | 'BANKRUPT' | number, label: string, background: string}[] = [
  {
    value: 0,
    label: $t('components.wheel.fields.money', {money: 0}),
    background: '#B4B4B4'
  },
  {
    value: 25,
    label: $t('components.wheel.fields.money', {money: 25}),
    background: '#FD7D96'
  },
  {
    value: 50,
    label: $t('components.wheel.fields.money', {money: 50}),
    background: '#343399'
  },
  {
    value: 75,
    label: $t('components.wheel.fields.money', {money: 75}),
    background: '#FEFE00'
  },
  {
    value: 100,
    label: $t('components.wheel.fields.money', {money: 100}),
    background: '#FE4600'
  },
  {
    value: 150,
    label: $t('components.wheel.fields.money', {money: 150}),
    background: '#00A500'
  },
  {
    value: 200,
    label: $t('components.wheel.fields.money', {money: 200}),
    background: '#C9FE00'
  },
  {
    value: 'PRIZE',
    label: $t('components.wheel.fields.prize'),
    background: '#C89601'
  },
  {
    value: 250,
    label: $t('components.wheel.fields.money', {money: 250}),
    background: '#FE9900'
  },
  {
    value: 300,
    label: $t('components.wheel.fields.money', {money: 300}),
    background: '#343399'
  },
  {
    value: 350,
    label: $t('components.wheel.fields.money', {money: 350}),
    background: '#DF009D'
  },
  {
    value: 400,
    label: $t('components.wheel.fields.money', {money: 400}),
    background: '#FE4600'
    
  },
  {
    value: 'BANKRUPT',
    label: $t('components.wheel.fields.bankrupt'),
    background: '#000'
  },
  {
    value: 450,
    label: $t('components.wheel.fields.money', {money: 450}),
    background: '#FD7D96'
  },
  {
    value: 500,
    label: $t('components.wheel.fields.money', {money: 500}),
    background: '#FE4600'
  },
  {
    value: 1000,
    label: $t('components.wheel.fields.money', {money: 1000}),
    background: '#FEFE00'
  },
  {
    value: 1500,
    label: $t('components.wheel.fields.money', {money: 1500}),
    background: '#343399'
  },
  {
    value: 2000,
    label: $t('components.wheel.fields.money', {money: 2000}),
    background: '#FE9900'
  },
  {
    value: 5000,
    label: $t('components.wheel.fields.money', {money: 5000}),
    background: '#00A500'
  },
  {
    value: 'LOSE_TURN',
    label: $t('components.wheel.fields.loseTurn'),
    background: '#B4B4B4'
  }
]

const fieldDegrees = 360 / fields.length
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

    // document.body.removeEventListener('keydown', spacebarHandler)

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

    const successfullSpin = Math.random() < successfullSpinProbability

    if (successfullSpin) {
      const drawnFieldIndex = Math.floor(Math.random() * fields.length)
      const drawnField = fields[drawnFieldIndex]

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