import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Room, RoomOptions } from 'src/models/game';
import { api } from 'boot/axios';
import { useAccountStore } from 'stores/account';
import { RoomId } from 'src/models/room';

export const useRoomsStore = defineStore('rooms', () => {
  const rooms = ref([] as Room[]);

  const ordered = computed(() => {
    const $account = useAccountStore();
    const head: Room[] = [];
    const other: Room[] = [];
    const tail: Room[] = [];

    rooms.value.forEach((room) => {
      if (
        room.host === $account.user.nickname ||
        room.guest === $account.user.nickname
      ) {
        head.unshift(room);
      } else if (room.options.enemy === $account.user.nickname) {
        head.push(room);
      } else if (room.gameId) {
        tail.push(room);
      } else {
        other.push(room);
      }
    });

    return [...head, ...other, ...tail];
  });

  async function load() {
    const { data } = await api.get<{ items: Room[] }>('/room');
    rooms.value = data.items;
  }

  async function add(r: Room) {
    if (!rooms.value.includes(r)) {
      rooms.value.push(r);
    }
  }

  async function update(room: Room) {
    for (let i = 0; i < rooms.value.length; i += 1) {
      if (rooms.value[i].id === room.id) {
        rooms.value[i] = room;
        break;
      }
    }
  }

  async function remove(id: string) {
    const pos = rooms.value.findIndex((r) => r.id === id);

    if (pos !== -1) {
      rooms.value.splice(pos, 1);
    }
  }

  async function create(o: RoomOptions) {
    await api.post('/room', o);
  }

  async function kick(id: RoomId) {
    return await api.post(`/room/${id}/kick`);
  }

  async function cancel(id: RoomId) {
    return await api.delete(`/room/${id}`);
  }

  async function join(id: RoomId) {
    return await api.post(`/room/${id}/join`);
  }

  async function leave(id: RoomId) {
    return await api.post(`/room/${id}/leave`);
  }

  async function start(id: RoomId) {
    return await api.post(`/room/${id}/start`);
  }

  return {
    rooms,
    ordered,
    load,
    add,
    update,
    remove,
    create,
    kick,
    cancel,
    join,
    leave,
    start,
  };
});
