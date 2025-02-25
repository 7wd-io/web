<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin text-dark">
      <q-card-section>
        <q-list>
          <q-item-label header> Game</q-item-label>

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
                v-model="settings.game.animationSpeed"
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

          <q-item-label header> Sounds</q-item-label>

          <q-item v-ripple tag="label">
            <q-item-section>
              <q-item-label class="text-weight-bold">
                Opponent joined
              </q-item-label>
              <q-item-label caption>
                Notify when an opponent joined the room
              </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-toggle v-model="settings.sounds.opponentJoined" />
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item v-ripple tag="label">
            <q-item-section>
              <q-item-label class="text-weight-bold"> My turn</q-item-label>
              <q-item-label caption> Notify when it is my turn</q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-toggle v-model="settings.sounds.myTurn" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator />

      <q-card-actions align="center" class="q-pa-lg">
        <q-btn
          push
          :loading="inProgress"
          color="primary"
          label="Save"
          @click="onSave"
        />
        <q-btn
          push
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
import { useDialogPluginComponent } from 'quasar';
import { ref, toRaw } from 'vue';
import { useAccountStore } from 'stores/account';

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

defineEmits([...useDialogPluginComponent.emits]);

const $account = useAccountStore();

const inProgress = ref(false);

const settings = ref(structuredClone(toRaw($account.user.settings)));

const onSave = async () => {
  inProgress.value = true;

  try {
    await $account.updateSettings(settings.value);
  } finally {
    inProgress.value = false;
    onDialogOK();
  }
};
</script>
