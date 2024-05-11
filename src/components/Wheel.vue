<template>
  <div class="wheel">
    <div class="wheel__wrapper">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t: $t } = useI18n();

const fields: {value: string | number, label: string, background: string}[] = [
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

const fieldDegrees = 360 / fields.length;
const fieldWidth = Math.tan(fieldDegrees * Math.PI / 180) * 14;
</script>

<style lang="scss">
.wheel {
  width: 30rem;
  height: 30rem;
  background: #fff;
  border: 0.1rem solid #000;
  padding: 1rem;

  &__wrapper {
    width: 28rem;
    height: 28rem;
    border-radius: 50%;
    border: 0.1rem solid #000;
    overflow: hidden;
    position: relative;
  }

  &__line {
    width: 0.1rem;
    height: 14rem;
    background-color: #000;
    transform-origin: center bottom;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  &__field-background {
    width: 0;
    height: 0;
    border-bottom-style: solid;
    border-left-style: solid;
    border-bottom-color: transparent;
    border-bottom-width: 14rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: left bottom;
  }

  &__field-text {
    height: 14rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center bottom;
    z-index: 1;
    padding-top: 1rem;
  }

  &__field-letter {
    text-align: center;
    color: #fff;
    text-transform: uppercase;
  }
}
</style>