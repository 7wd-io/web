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
                <q-icon name="cake" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold">
                  Promo wonders
                </q-item-label>
                <q-item-label caption>
                  <q-btn
                    v-for="[label, link] in promoWonders"
                    :key="label"
                    dense
                    color="primary"
                    size="xs"
                    :href="link"
                    target="_blank"
                    rounded
                    flat
                    >{{ label }}</q-btn
                  >
                </q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-toggle v-model="settings.promoWonders" />
              </q-item-section>
            </q-item>

            <q-item v-ripple tag="label">
              <q-item-section avatar>
                <q-icon name="bolt" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold"> Fast </q-item-label>
                <q-item-label caption>
                  7 min on clock, +5 sec per move
                </q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-toggle v-model="settings.fast" />
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
                <q-toggle v-model="settings.minRating.enabled" />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <div
                  v-show="settings.minRating.enabled"
                  class="text-bold text-primary"
                >
                  {{ settings.minRating.value }}
                </div>
              </q-item-section>
              <q-item-section>
                <q-slider
                  v-model="settings.minRating.value"
                  :disable="!settings.minRating.enabled"
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
                <q-item-label caption> Play with friends </q-item-label>
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
              push
              :loading="inProgress"
              color="primary"
              label="Create"
              @click="onCreate"
            />
            <q-btn
              push
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
              push
              :loading="inProgress"
              color="primary"
              label="Create"
              @click="onCreateWithBot"
            />
            <q-btn
              push
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
import { useOnlineStore } from 'stores/online';
import { useRoomsStore } from 'stores/rooms';
import { useGameStore } from 'stores/game/game';
import { RoomOptions } from 'src/models/game';
import { Nickname } from 'src/models/account';

const MIN_RATING = 1500;
const MAX_RATING = 2000;

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

defineEmits([...useDialogPluginComponent.emits]);

const $q = useQuasar();
const $online = useOnlineStore();
const $rooms = useRoomsStore();
const $game = useGameStore();

const tab = ref('rating');
const settings = ref($rooms.$state.settings);
const flagPrivate = ref(false);
const privateNickname = ref('');

const promoWonders = [
  [
    'Messe',
    'https://boardgamegeek.com/boardgame/186069/7-wonders-duel-the-messe-essen-promo-card',
  ],
  [
    'The Statue of Liberty',
    'https://boardgamegeek.com/boardgame/196339/7-wonders-duel-statue-of-liberty-promo-card',
  ],
];

watch(
  settings,
  (newValue) => {
    if (newValue.minRating.enabled) {
      flagPrivate.value = false;
      privateNickname.value = '';
    }
  },
  { deep: true }
);

watch(flagPrivate, (newValue) => {
  if (newValue) {
    settings.value.minRating.enabled = false;
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
    promoWonders: settings.value.promoWonders,
    fast: settings.value.fast,
  };

  if (settings.value.minRating.enabled) {
    params.minRating = settings.value.minRating.value;
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
    await $rooms.create(params);
  } finally {
    inProgress.value = false;
    onDialogOK();
  }
};

const onCreateWithBot = async () => {
  inProgress.value = true;

  try {
    await $game.createWithBot();
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
