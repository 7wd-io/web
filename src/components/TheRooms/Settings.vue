<template>
  <q-btn round flat icon="tune">
    <q-menu
      anchor="bottom end"
      self="top end"
      transition-show="flip-right"
      transition-hide="flip-left"
    >
      <q-list dense>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>
              Hide in progress
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle
              v-model="hideInProgress"
              color="primary"
            />
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>
              Hide inaccessible
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle
              v-model="hideInaccessible"
              color="primary"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hideInProgress = ref(false);
const hideInaccessible = ref(false);
</script>
