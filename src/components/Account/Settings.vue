<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin text-dark">
      <q-card-section>
        <q-list>
          <q-item-label header>
            Game
          </q-item-label>

          <q-item>
            <q-item-section>
              <q-item-label class="text-weight-bold">
                Animation speed
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <span>slower</span>
            </q-item-section>

            <q-item-section>
              <q-slider
                v-model="settings.animationSpeed"
                markers
                snap
                :min="1"
                :max="5"
              />
            </q-item-section>

            <q-item-section side>
              <span>faster</span>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item-label header>
            Sounds
          </q-item-label>

          <q-item
            v-ripple
            tag="label"
          >
            <q-item-section>
              <q-item-label class="text-weight-bold">
                Opponent joined
              </q-item-label>
              <q-item-label caption>
                Notify when an opponent joined the room
              </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-toggle
                v-model="settings.opponentJoined"
              />
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item
            v-ripple
            tag="label"
          >
            <q-item-section>
              <q-item-label class="text-weight-bold">
                My turn
              </q-item-label>
              <q-item-label caption>
                Notify when it is my turn
              </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-toggle
                v-model="settings.myTurn"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator />

      <q-card-actions
        align="center"
        class="q-pa-lg"
      >
        <q-btn
          :loading="inProgress"
          color="primary"
          label="Save"
          @click="onSave"
        />
        <q-btn
          outline
          color="primary"
          label="Cancel"
          @click="onDialogCancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { reactive, ref } from 'vue';
import { ApiError, httpClient } from 'boot/api';
import { useAccount } from 'src/stores/account';

const {
  dialogRef,
  onDialogHide,
  onDialogOK,
  onDialogCancel,
} = useDialogPluginComponent();

// runtime
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits([...useDialogPluginComponent.emits]);

const $q = useQuasar();
const $account = useAccount();

const inProgress = ref(false);

const settings = reactive({
  animationSpeed: $account.profile.settings.game.animationSpeed,
  opponentJoined: $account.profile.settings.sounds.opponentJoined,
  myTurn: $account.profile.settings.sounds.myTurn,
});

const onSave = async () => {
  inProgress.value = true;

  try {
    await httpClient.put('/account/settings', {
      animationSpeed: settings.animationSpeed,
      opponentJoined: settings.opponentJoined,
      myTurn: settings.myTurn,
    });

    $account.profile.settings = {
      game: {
        animationSpeed: settings.animationSpeed,
      },
      sounds: {
        opponentJoined: settings.opponentJoined,
        myTurn: settings.myTurn,
      },
    };
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err_message,
      type: 'negative',
    });
  } finally {
    inProgress.value = false;
    onDialogOK();
  }
};
</script>
