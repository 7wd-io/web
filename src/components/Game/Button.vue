<template>
  <q-btn
    push
    size="calc(var(--swd-game-unit) * 1)"
    v-bind="$attrs"
    color="primary"
  >
    <slot />
  </q-btn>
</template>

<script setup lang="ts"></script>
