<template>
  <div class="turn-actions card-wrapper">
    <Button @click="spin">{{ $t('components.turnActions.spin') }}</Button>
    <Button @click="solvePuzzle">{{ $t('components.turnActions.solve') }}</Button>
    <Button @click="passTurn">{{ $t('components.turnActions.pass') }}</Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue';
import { useI18n } from 'vue-i18n'
import { ref } from 'vue';

const { t: $t } = useI18n();
</script>