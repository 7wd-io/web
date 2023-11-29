<template>
  <Badge
    v-if="counter"
    class="one-from-resource-badge full-width"
    :pos="pos"
    :y="offset"
  >
    <div class="absolute-center">
      <Counter :value="counter" :size="size" />
    </div>
  </Badge>
</template>

<script setup lang="ts">
import Badge from 'components/Badge.vue';
import Counter from 'components/Game/Counter.vue';
import { DiscounterContext, ResourceId } from 'src/models/game';
import { Nickname } from 'src/models/account';
import { useGameStore } from 'stores/game/game';
import { computed } from 'vue';

interface Props {
  name: Nickname;
  group: ResourceId[];
  pos: 'top' | 'bottom';
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { name, group, pos } = defineProps<Props>();

let offset = '400%';
const size = 'calc(var(--swd-game-unit) * 1.1)';

if (pos === 'top') {
  offset = `-${offset}`;
}

const $game = useGameStore();
const city = computed(() => $game.city(name));
const counter = computed(() => {
  let c = 0;
  if (city.value.discounter.list) {
    for (let i = 0; i < city.value.discounter.list.length; i += 1) {
      const item = city.value.discounter.list[i];
      if (item.context !== DiscounterContext.global) {
        // eslint-disable-next-line no-continue
        continue;
      }
      const r = Number(Object.keys(item.resources)[0]);

      if (group.includes(r)) {
        c += 1;
      }
    }
  }
  return c;
});
</script>

<style lang="scss" scoped>
.one-from-resource-badge {
  --size: v-bind(size);
  background-color: $primary;
  height: calc(var(--size) * 0.2);
  border-radius: 2px;
}
</style>
