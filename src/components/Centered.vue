<template>
  <div class="centered">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.centered {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
