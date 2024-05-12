<template>
  <div class="turn-actions card-wrapper">
    <button @click="spin">{{ $t('components.turnActions.spin') }}</button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, defineEmits } from 'vue';

const { t: $t } = useI18n();
const emit = defineEmits<{
  playerAction: ['SPIN']
}>();

const spin = () => {
  emit('playerAction', 'SPIN');
}
</script>