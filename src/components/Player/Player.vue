<template>
  <span class="cursor-pointer" @click="onPlayerClick(name)">
    {{ body || name }}
  </span>
</template>

<script setup lang="ts">
import { Nickname } from 'src/models/account';
import { usePlayerComponent } from './composables';

interface Props {
  name: Nickname;
  body?: string;
}

defineProps<Props>();

const { onPlayerClick } = usePlayerComponent();
</script>
