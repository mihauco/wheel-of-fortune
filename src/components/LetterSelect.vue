<template>
  <GameOverlay>
    <div class="letter-select card-wrapper">
      <div class="letter-select__title">
        {{ $t(type === 'vowel' ? 'components.letterSelect.title.vowel' : 'components.letterSelect.title.consonant') }}
      </div>
      <div class="letter-select__letters">
        <div
          v-for="letter in lettersToSelect"
          class="letter-select__letter"
          :key="letter"
          @click="handleLetterClick(letter)"
        >
          {{ letter }}
        </div>
      </div>
    </div>
  </GameOverlay>
</template>

<script setup lang="ts">
import GameOverlay from '@/components/GameOverlay.vue'
import { useI18n } from 'vue-i18n'
import { computed, defineEmits } from 'vue'
import useGameStore from '@/composables/gameStore';

const { t: $t } = useI18n()
const { guessConsonant, buyVowel } = useGameStore()
const props = defineProps<{
  type: 'vowel' | 'consonant'
}>()
const emit = defineEmits<{
  selectEnd: [{
    hits: number,
    letter: string
  }]
}>()

const consoants = {
  'pl': ['B', 'C', 'Ć', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'P', 'R', 'S', 'Ś', 'T', 'W', 'X', 'Z', 'Ź', 'Ż'],
}

const vowels = {
  'pl': ['A', 'Ą', 'E', 'Ę', 'I', 'O', 'Ó', 'U', 'Y']
}

const lettersToSelect = computed(() => {
  return props.type === 'vowel' ? vowels['pl'] : consoants['pl']
})

const handleLetterClick = (letter: string) => {
  const hits = props.type === 'vowel' ? buyVowel(letter) : guessConsonant(letter)
  emit('selectEnd', { hits, letter })
}
</script>

<style lang="scss">
$letterSpacing: .5rem;
$letterWidth: 2rem;
$lettersPerRow: 10;

.letter-select {
  padding: 2rem;

  &__title {
    text-align: center;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  &__letters {
    width: calc(#{$letterWidth} * #{$lettersPerRow} + #{$letterSpacing} * (#{$lettersPerRow} - 1));
    margin: calc(#{$letterSpacing} / 2);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  &__letter {
    width: $letterWidth;
    height: calc(#{$letterWidth} * 1.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    margin: calc(#{$letterSpacing} / 2);
    border: 1px solid #000;
    cursor: pointer;

    &:active {
      background-color: #ddd;
    }
  }
}
</style>