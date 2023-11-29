import { defineStore } from 'pinia';
import { Log } from 'src/models/log';

export const useLogStore = defineStore('game:log', {
  state: () => ({
    records: [] as Log,
    replay: false as boolean,
    index: -2 as number,
  }),
  getters: {
    last(state) {
      return state.records[state.records.length - 1];
    },
  },
  actions: {
    replayOn(index: number) {
      this.replay = true;
      this.index = index;
    },
    replayOff() {
      this.replay = false;
      this.index = this.records.length;
    },
    next() {
      this.index += 1;
    },
    prev() {
      this.index -= 1;
    },
  },
});
