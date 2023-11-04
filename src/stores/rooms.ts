import { defineStore } from 'pinia';
import { Room } from 'src/models/game';
import { Nickname } from 'src/models/account';
import { api } from 'boot/axios';
import { useAccountStore } from 'src/stores/account';

export const useRooms = defineStore('rooms', {
  state: () => ({
    rooms: [] as Room[],
  }),
  getters: {
    ordered(state) {
      const $account = useAccountStore();
      const head: Room[] = [];
      const other: Room[] = [];
      const tail: Room[] = [];

      state.rooms.forEach((room) => {
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
    },
  },
  actions: {
    async load() {
      const { data } = await api.get<{ data: Room[] }>('/rooms');
      this.rooms = data.data;
    },
    add(room: Room) {
      if (!this.rooms.includes(room)) {
        this.rooms.push(room);
      }
    },
    update(room: Room) {
      for (let i = 0; i < this.rooms.length; i += 1) {
        if (this.rooms[i].host === room.host) {
          this.rooms[i] = room;
          break;
        }
      }
    },
    remove(host: Nickname) {
      const pos = this.rooms.findIndex((r) => r.host === host);

      if (pos !== -1) {
        this.rooms.splice(pos, 1);
      }
    },
  },
});

export type RoomsStore = ReturnType<typeof useRooms>;
