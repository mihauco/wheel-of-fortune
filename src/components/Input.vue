<template>
  <div class="input">
    <label
      v-if="label"
      class="input__label"
      :for="inputId"
    >
      {{ label }}
    </label>
    <div class="input__field-wrapper">
      <input
        :id="inputId"
        class="input__field"
        type="text"
        v-model="inputValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, computed, ref } from 'vue'
import createUniqueRandomString from '@/utils/createUniqueRandomString'

const props = defineProps<{
  id?: string,
  label?: string,
  modelValue: string
}>()

const inputId = ref<string>(props.id || createUniqueRandomString())

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (newValue: string) => {
    emit('update:modelValue', newValue)
  }
})
</script>

<style lang="scss">
.input {
  &__field-wrapper {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: var(--shadow-pattern-image);
      opacity: 0.2;
      z-index: 1;
    }
  }

  &__field {
    width: 100%;
    border: none;
    border-bottom: 0.2rem solid var(--main-color);
    height: 4rem;
    font-size: 2rem;
    padding: 0;
    position: relative;
    z-index: 2;
    background: none;
  }
}
</style>