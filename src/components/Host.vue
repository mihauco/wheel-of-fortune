<template>
  <div class="host">
    <div class="host__avatar-wrapper card-wrapper">
      <img
        src="/host.png?url"
        class="host__avatar"
      >
    </div>
    <div class="host__text card-wrapper">
      <div v-html="animatedText"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, onMounted } from 'vue'

const props = defineProps<{
  text: string
}>()

const emit = defineEmits<{
  textEnd: []
}>()

const animatedText = ref<string | null>(null)
let immediatllyStopTextAnimation = false;
let keyUpHandlerAdded = false

const keyUpHandler = (event: KeyboardEvent) => {
  if (event.key === ' ') {
    immediatllyStopTextAnimation = true
  }
}

const animateText = (length:number = 0) => {
  if (!keyUpHandlerAdded) {
    keyUpHandlerAdded = true
    document.body.addEventListener('keyup', keyUpHandler)
  }

  if (immediatllyStopTextAnimation) {
    animatedText.value = props.text
    immediatllyStopTextAnimation = false
    document.body.removeEventListener('keyup', keyUpHandler)
    keyUpHandlerAdded = false
    emit('textEnd') 
    return
  }

  animatedText.value = props.text.slice(0, length)

  if (length < props.text.length) {
    setTimeout(() => {
      animateText(length + 1)
    }, 40)
  } else {
    document.body.removeEventListener('keyup', keyUpHandler)
    immediatllyStopTextAnimation = false
    keyUpHandlerAdded = false
    emit('textEnd')
  }
}

watch(() => props.text, () => {
  animateText()
})

onMounted(() => {
  animateText()
})
</script>

<style lang="scss">
  .host {
    height: 8rem;
    display: flex;
    justify-content: space-between;
    align-items: stretch;

    &__avatar-wrapper {
      margin-right: 2rem;
      flex: 0 0 auto
    }

    &__avatar {
      height: 100%;
      width: auto;
      display: block;
    }

    &__text {
      flex: 1 1 auto;
      font-size: 1.5rem;
      line-height: 1.5;
      padding: 1rem;
    }
  }
</style>

