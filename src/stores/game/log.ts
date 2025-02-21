import { defineStore } from 'pinia';
import { Log } from 'src/models/log';
import { ref, computed } from 'vue';

export const useLogStore = defineStore('game:log', () => {
  const records = ref<Log>([]);
  const replay = ref(false);
  const index = ref(-2);

  const last = computed(() => records.value[records.value.length - 1]);

  function replayOn(index_: number) {
    replay.value = true;
    index.value = index_;
  }

  function replayOff() {
    replay.value = false;
    index.value = records.value.length;
  }

  function next() {
    index.value += 1;
  }

  function prev() {
    index.value -= 1;
  }

  return {
    records,
    replay,
    index,
    last,
    replayOn,
    replayOff,
    next,
    prev,
  };
});
