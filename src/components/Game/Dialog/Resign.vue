<template>
  <q-dialog
    id="dialog-resign"
    ref="dialogRef"
    @hide="onDialogHide"
    :persistent="false"
  >
    <q-card class="swd-dialog q-pa-lg">
      <q-card-section>
        <Title> Are you sure? </Title>
      </q-card-section>
      <q-card-actions align="center">
        <Button label="resign" @click="onConfirm" v-close-popup />
        <Button label="cancel" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import Button from 'components/Game/Button.vue';
import { useDialogPluginComponent } from 'quasar';
import { useGame } from 'stores/game/game';
import { useMoveStore } from 'stores/game/move';
import Title from './Title.vue';

// runtime
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const $game = useGame();

const onConfirm = () => {
  useMoveStore().resign($game.id);
};
</script>
