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
        <Button label="resign" @click="confirm" v-close-popup />
        <Button label="cancel" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import Button from 'components/Game/Button.vue';
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { useGame } from 'src/stores/game/game';
import { ApiError, api } from 'boot/axios';
import Title from './Title.vue';

// runtime
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const $q = useQuasar();
const $game = useGame();

const confirm = async () => {
  try {
    await api.post('/game/move/resign', {
      gid: $game.id,
    });
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err,
      type: 'negative',
    });
  }
};
</script>
