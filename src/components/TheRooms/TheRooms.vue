<template>
  <div class="row justify-between">
    <div class="text-h6 text-weight-bolder">
      Rooms
    </div>
    <div>
      <q-btn
        :disabled="hasRoom"
        class="swd-btn-primary"
        label="New"
        @click="onNew"
      />
    </div>
  </div>

  <RoomComponent
    v-for="room in rooms"
    :key="room.host"
    :data="room"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAccount } from 'src/stores/account';
import { useRooms } from 'src/stores/rooms';
import { useQuasar } from 'quasar';
import TheNewDialog from './TheNewDialog.vue';
import RoomComponent from './Room.vue';

const $q = useQuasar();
const $account = useAccount();
const $rooms = useRooms();

const hasRoom = computed(() => $account.hasRoom);
const rooms = computed(() => $rooms.ordered);
const onNew = () => {
  $q.dialog({
    component: TheNewDialog,
  });
};
</script>
