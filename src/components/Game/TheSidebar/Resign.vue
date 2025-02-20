<template>
  <q-list bordered separator>
    <q-item clickable v-ripple class="swd-btn-primary" @click="resign">
      <q-item-section avatar>
        <q-icon name="outlined_flag" />
      </q-item-section>

      <q-item-section> RESIGN </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import Resign from 'components/Game/Dialog/Resign.vue';

const $q = useQuasar();
const resign = () => {
  $q.dialog({
    component: Resign,
  });
};
</script>
