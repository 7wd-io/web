<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin text-dark">
      <q-tabs v-model="tab" align="justify">
        <q-tab label="rating" name="rating" />
        <q-tab label="vs bot" name="bot" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="rating" dark class="no-padding">
          <q-list>
            <q-item v-ripple tag="label">
              <q-item-section avatar>
                <q-icon name="bolt" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold"> Fast </q-item-label>
                <q-item-label caption>
                  3 min on clock, +5 sec per move
                </q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-toggle v-model="flagFast" />
              </q-item-section>
            </q-item>

            <q-separator />

            <q-item v-ripple tag="label">
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold">
                  Min rating
                </q-item-label>
                <q-item-label caption>
                  Only players with higher ratings can join to game
                </q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-toggle v-model="flagMinRating" />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <div v-show="flagMinRating" class="text-bold text-primary">
                  {{ minRating }}
                </div>
              </q-item-section>
              <q-item-section>
                <q-slider
                  v-model="minRating"
                  :disable="!flagMinRating"
                  markers
                  snap
                  :min="MIN_RATING"
                  :max="MAX_RATING"
                />
              </q-item-section>
            </q-item>

            <q-separator />

            <q-item v-ripple tag="label">
              <q-item-section avatar>
                <q-icon name="lock" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold"> Private </q-item-label>
                <q-item-label caption> Who can join to game </q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-toggle v-model="flagPrivate" />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar />
              <q-item-section>
                <q-select
                  color="primary"
                  popup-content-class="private-dropdown"
                  v-model="privateNickname"
                  use-input
                  :options="privateOptions"
                  :dense="true"
                  :disable="!flagPrivate"
                  label="Nickname"
                  @filter="searchPlayer"
                />
              </q-item-section>
            </q-item>
          </q-list>

          <q-separator />

          <q-card-actions align="center" class="q-pa-lg">
            <q-btn
              :loading="inProgress"
              color="primary"
              label="Create"
              @click="onCreate"
            />
            <q-btn
              outline
              color="primary"
              label="Cancel"
              @click="onDialogCancel"
            />
          </q-card-actions>
        </q-tab-panel>

        <q-tab-panel name="bot" dark class="no-padding">
          <q-card-section>
            <div class="text-subtitle2">
              Playing against a bot is the best way to get acquainted with the
              UI and functionality.
            </div>

            <br />

            <ul>
              <li>playing against a bot does <b>not affect your rating</b></li>
              <li>games against a bot are <b>not counted in statistics</b></li>
              <li>classic wonders only(no Messe, The Statue of Liberty)</li>
              <li>extended time bank <b>30 min</b></li>
            </ul>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center" class="q-pa-lg">
            <q-btn
              :loading="inProgress"
              color="primary"
              label="Create"
              @click="onCreateWithBot"
            />
            <q-btn
              outline
              color="primary"
              label="Cancel"
              @click="onDialogCancel"
            />
          </q-card-actions>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { ref, watch, computed } from 'vue';
import { useOnline } from 'src/stores/online';
import { RoomOptions } from 'src/models/game';
import { Nickname } from 'src/models/account';
import { ApiError, api } from 'boot/axios';

const MIN_RATING = 1500;
const MAX_RATING = 2000;

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

// runtime
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits([...useDialogPluginComponent.emits]);

const $q = useQuasar();
const $online = useOnline();

const tab = ref('rating');

const flagFast = ref(false);
const flagMinRating = ref(false);
const flagPrivate = ref(false);

const minRating = ref(MIN_RATING);
const privateNickname = ref('');

watch(flagMinRating, (newValue) => {
  if (newValue) {
    flagPrivate.value = false;
    privateNickname.value = '';
  }
});

watch(flagPrivate, (newValue) => {
  if (newValue) {
    flagMinRating.value = false;
    minRating.value = MIN_RATING;
  }
});

const search = computed(() => $online.search);
const privateOptions = ref(search.value);
const inProgress = ref(false);

const searchPlayer = (val: Nickname, update: (f: () => void) => void) => {
  if (val === '') {
    update(() => {
      privateOptions.value = search.value;
    });

    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    privateOptions.value = search.value.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

const onCreate = async () => {
  inProgress.value = true;
  const params: RoomOptions = {
    fast: flagFast.value,
  };

  if (flagMinRating.value) {
    params.minRating = minRating.value;
  }

  if (flagPrivate.value) {
    if (!privateNickname.value) {
      $q.notify({
        message: 'You select private game, nickname is required',
        type: 'negative',
      });

      inProgress.value = false;

      return;
    }

    params.enemy = privateNickname.value;
  }

  try {
    await api.post('/room', params);
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err,
      type: 'negative',
    });
  } finally {
    inProgress.value = false;
    onDialogOK();
  }
};

const onCreateWithBot = async () => {
  inProgress.value = true;

  try {
    await api.post('/game-with-bot');
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err,
      type: 'negative',
    });
  } finally {
    inProgress.value = false;
    onDialogOK();
  }
};
</script>

<style>
.private-dropdown {
  color: #000;
}
</style>
