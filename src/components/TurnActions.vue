<template>
  <div class="turn-actions card-wrapper">
    <Button @click="spin">{{ $t('components.turnActions.spin') }}</Button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, defineEmits } from 'vue';
import Button from '@/components/Button.vue';

const { t: $t } = useI18n();
const emit = defineEmits<{
  playerAction: ['SPIN']
}>();

const spin = () => {
  emit('playerAction', 'SPIN');
}
</script>