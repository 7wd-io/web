<script setup lang="ts">
import ThePublicChat from 'components/Chat/ThePublicChat.vue';
import TheOnline from 'components/TheOnline.vue';
import TheTop from 'components/TheTop.vue';
import TheRooms from 'components/TheRooms/TheRooms.vue';
</script>

<template>
  <q-page padding class="page-lobby">
    <div>
      <TheTop />
    </div>

    <div class="row justify-center">
      <div style="width: 500px">
        <TheRooms />
      </div>
    </div>

    <div>
      <ThePublicChat class="q-mb-md" />

      <TheOnline />
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.page-lobby {
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  grid-column-gap: 24px;
}
</style>
