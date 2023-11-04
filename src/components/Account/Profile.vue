<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="panel bg-accent" style="width: 700px">
      <q-card-section class="text-dark">
        <div class="row justify-between">
          <div class="text-weight-bolder text-h6" style="height: 100px">
            {{ name }}
          </div>

          <div>
            <q-tabs
              v-model="tab"
              dense
              no-caps
              class="text-weight-bold"
              @update:model-value="onChangeTab"
            >
              <q-tab name="overview" label="Overview" />

              <q-tab name="stats"> Stats </q-tab>

              <q-tab v-if="$account.user.nickname !== name" name="vs">
                Me vs {{ name }}
              </q-tab>
            </q-tabs>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="no-padding text-dark">
        <q-card class="no-box-shadow panel-card" style="height: 320px">
          <q-tab-panels
            v-model="tab"
            animated
            style="transform: translateY(-50px)"
            class="bg-transparent"
          >
            <q-tab-panel name="overview">
              <template v-if="profile">
                <div class="row justify-center q-gutter-lg q-mb-lg">
                  <Card label="Rank" :body="profile.rank" />

                  <Card label="Rating" :body="profile.rating" />
                </div>

                <div class="row justify-center q-gutter-lg">
                  <Card label="Games played" :body="gamesPlayed" />

                  <Card label="Games won" :body="`${gamesWonRate}%`" />
                </div>
              </template>
            </q-tab-panel>

            <q-tab-panel name="stats">
              <div class="row justify-center q-gutter-lg">
                <StatsCard :data="profile.games.won" :total="gamesPlayed">
                  <template #title>
                    <span class="text-positive">Won</span>
                  </template>
                </StatsCard>

                <StatsCard :data="profile.games.lose" :total="gamesPlayed">
                  <template #title>
                    <span class="text-negative">Lost</span>
                  </template>
                </StatsCard>
              </div>
            </q-tab-panel>

            <q-tab-panel name="vs">
              <template v-if="profileVersus">
                <div class="row justify-center q-gutter-lg">
                  <StatsCard
                    :data="profileVersus.games.won"
                    :total="
                      profileVersus.games.won.total +
                      profileVersus.games.lose.total
                    "
                  >
                    <template #title>
                      <span class="text-positive">Won</span>
                    </template>
                  </StatsCard>

                  <StatsCard
                    :data="profileVersus.games.lose"
                    :total="
                      profileVersus.games.won.total +
                      profileVersus.games.lose.total
                    "
                  >
                    <template #title>
                      <span class="text-negative">Lost</span>
                    </template>
                  </StatsCard>
                </div>
              </template>
            </q-tab-panel>
          </q-tab-panels>
          <q-inner-loading
            :showing="loading"
            color="dark"
            label="Please wait..."
            label-style="font-size: 1.1em; color: #000;"
            class="bg-transparent"
          />
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar, useDialogPluginComponent } from 'quasar';
import { Nickname } from 'src/models/account';
import { ApiError, api } from 'boot/axios';
import { computed, onBeforeMount, ref } from 'vue';
import { GamesReport, Profile } from 'src/models/profile';
import { useAccountStore } from 'src/stores/account';
import Card from './Card.vue';
import StatsCard from './StatsCard.vue';

interface Props {
  name: Nickname;
}

const { dialogRef, onDialogHide } = useDialogPluginComponent();

// eslint-disable-next-line vue/no-setup-props-destructure
const { name } = defineProps<Props>();

// runtime
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits([...useDialogPluginComponent.emits]);

const $q = useQuasar();
const $account = useAccountStore();

const loading = ref(false);
const profile = ref<Profile>();
const profileVersus = ref<GamesReport>();

onBeforeMount(async () => {
  loading.value = true;

  try {
    const { data } = await api.get<{ profile: Profile }>(`/profile/${name}`);
    profile.value = data.profile;
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err_message,
      type: 'negative',
    });
  } finally {
    loading.value = false;
  }
});

const gamesPlayed = computed(() => {
  if (!profile.value) {
    return 0;
  }

  return profile.value.games.won.total + profile.value.games.lose.total;
});

const gamesWonRate = computed(() => {
  if (!profile.value || !gamesPlayed.value) {
    return 0;
  }

  return ((profile.value.games.won.total * 100) / gamesPlayed.value).toFixed(2);
});

const tab = ref('overview');

const onChangeTab = async (value: string) => {
  if (value !== 'vs') {
    return;
  }

  loading.value = true;

  try {
    const { data } = await api.get<{ profile: GamesReport }>(
      `/profile/versus/${name}`
    );
    profileVersus.value = data.profile;
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err_message,
      type: 'negative',
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.panel-card {
  --radius: 15px;
  border-top-left-radius: var(--radius);
  border-top-right-radius: var(--radius);
  background-color: var(--swd-bg-color-main);
  /*background-color: rgba(255, 255, 255, .7);*/
}
</style>
