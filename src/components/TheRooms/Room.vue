<template>
  <q-card class="swd-cover-dark text-white text-dark q-mt-lg relative-position">
    <q-btn
      class="btn-close absolute swd-btn-primary"
      v-if="isHost() && !data.gameId"
      :loading="inProgressCancel"
      dense
      size="sm"
      round
      icon="close"
      @click="onCancel"
    />
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="text-weight-bolder q-pr-lg">
          <Player :name="data.host" class="text-weight-bolder" />
          <span>({{ data.hostRating }})</span>
          <template v-if="data.guest">
            <span class="inline-block relative-position">
              <span class="text-weight-regular q-mx-md">VS</span>
              <Player :name="data.guest" class="text-weight-bolder" />
              <span>({{ data.guestRating }})</span>

              <Badge v-if="isHost() && !data.gameId" pos="right" x="10px">
                <q-icon
                  name="close"
                  color="negative"
                  size="xxs"
                  class="cursor-pointer text-weight-bold"
                  title="kick"
                  @click="onKick"
                />
              </Badge>
            </span>
          </template>
        </div>
        <div class="col-grow text-right q-pr-md">
          <q-icon
            v-show="data.options.fast"
            name="bolt"
            size="xxs"
            class="text-primary"
          >
            <q-tooltip class="bg-dark text-white"> Fast on </q-tooltip>
          </q-icon>
          <q-chip
            v-show="data.options.enemy"
            icon="lock"
            size="sm"
            color="primary"
            text-color="white"
          >
            <span class="text-weight-bolder">{{ data.options.enemy }}</span>
            <q-tooltip class="bg-dark text-white"> Private game </q-tooltip>
          </q-chip>

          <q-chip
            v-show="data.options.minRating > 0"
            dense
            outline
            size="sm"
            color="primary"
            text-color="white"
          >
            <span class="text-weight-bolder"
              >> {{ data.options.minRating }}</span
            >
            <q-tooltip class="bg-dark text-white">
              Min rating who can join
            </q-tooltip>
          </q-chip>
        </div>
        <div>
          <q-btn
            v-if="data.gameId && (isHost() || isGuest())"
            class="swd-btn-primary"
            size="sm"
            label="play"
            @click="onPlay"
          />
          <q-btn
            v-else-if="data.gameId"
            class="swd-btn-primary"
            color="primary"
            outline
            size="sm"
            label="spectate"
            @click="onSpectate"
          />
          <q-btn
            v-else-if="isHost()"
            :disable="!data.guest"
            outline
            class="swd-btn-primary"
            color="primary"
            size="sm"
            label="start"
            @click="onStart"
          />
          <q-btn
            v-else-if="isGuest()"
            :loading="inProgressCancel"
            class="swd-btn-primary"
            color="primary"
            outline
            size="sm"
            label="leave"
            @click="onLeave"
          />
          <q-btn
            v-else
            :disable="joinDenied || hasRoom"
            class="swd-btn-primary"
            size="sm"
            label="join"
            @click="onJoin"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import Player from 'components/Player/Player.vue';
import { Room } from 'src/models/game';
import { computed, ref } from 'vue';
import { useAccountStore } from 'stores/account';
import { useOnlineStore } from 'stores/online';
import router from 'src/router';
import { ApiError, api } from 'boot/axios';
import { useQuasar } from 'quasar';
import Badge from 'components/Badge.vue';

interface Props {
  data: Room;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const props = defineProps<Props>();
const $q = useQuasar();
const $account = useAccountStore();
const $online = useOnlineStore();
const inProgressCancel = ref(false);
const hasRoom = computed(() => $account.hasRoom);
const joinDenied = computed(() => {
  if (props.data.guest) {
    return true;
  }

  if (
    props.data.options.minRating &&
    $online.players[$account.user.nickname] < props.data.options.minRating
  ) {
    return true;
  }

  if (
    props.data.options.enemy &&
    $account.user.nickname !== props.data.options.enemy
  ) {
    return true;
  }

  return false;
});

const openGame = async () => {
  await router.push({
    name: 'game',
    params: {
      id: props.data.gameId as string,
    },
  });
};

const isHost = () => props.data.host === $account.user.nickname;
const isGuest = () => props.data.guest === $account.user.nickname;

const onKick = async () => {
  try {
    await api.post(`/room/${props.data.id}/kick`);
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err,
      type: 'negative',
    });
  }
};

const onCancel = async () => {
  inProgressCancel.value = true;

  try {
    await api.delete(`/room/${props.data.id}`);
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err,
      type: 'negative',
    });
  } finally {
    inProgressCancel.value = false;
  }
};

const onJoin = async () => {
  try {
    await api.post(`/room/${props.data.id}/join`);
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err,
      type: 'negative',
    });
  }
};

const onLeave = async () => {
  try {
    await api.post(`/room/${props.data.id}/leave`);
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err,
      type: 'negative',
    });
  }
};

const onStart = async () => {
  try {
    await api.post(`/room/${props.data.id}/start`);
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err,
      type: 'negative',
    });
  }
};

const onPlay = async () => {
  await openGame();
};

const onSpectate = async () => {
  await openGame();
};
</script>

<style scoped lang="scss">
.btn-close {
  right: -1em;
  top: -1em;
  font-size: 0.5em !important;
  z-index: 10;
}
</style>
