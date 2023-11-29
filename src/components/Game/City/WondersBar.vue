<template>
  <div class="wonders-bar" :class="CityService.classWondersBar">
    <Wonder
      v-for="id in wonders"
      :key="id"
      :wid="id"
      :size="size"
      :cid="city.wonders.constructed?.[id]"
      :price="city.bank.wonderPrice?.[id]"
      :pos="badgePos"
      class="item"
      :class="CityService.getClassnameWonder(id)"
    />

    <div class="wonder-holder item" :class="CityService.classWonderHolder" />

    <Badge pos="center" class="z-top" :class="CityService.classBurnHolder">
      <!--           programmatically insert-->
    </Badge>
    <Badge
      :pos="badgePos"
      class="z-top"
      :class="CityService.classCardInHolder"
      x="200%"
    >
      <!--           programmatically insert-->
    </Badge>
  </div>
</template>

<script setup lang="ts">
import CityService from 'src/service/City';
import { useGameStore } from 'stores/game/game';
import { computed, ref, watch } from 'vue';
import { Nickname } from 'src/models/account';
import Wonder from 'components/Game/City/Wonder.vue';
import Badge from 'components/Badge.vue';

interface Props {
  name: Nickname;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { name } = defineProps<Props>();
const $game = useGameStore();
const size = 'calc(var(--swd-game-unit) * 12)';

const city = computed(() => $game.city(name));
const wonders = ref($game.city(name).wonders.list);
const badgePos = $game.left === name ? 'right' : 'left';

watch(
  () => $game.chan,
  () => {
    wonders.value = $game.city(name).wonders.list;
  }
);
</script>

<style lang="scss" scoped>
.wonders-bar {
  display: flex;
  flex-direction: column;

  .item {
    margin-top: var(--swd-game-gap-sm);
    &:first-child {
      margin-top: 0;
    }
  }
}

.wonder-holder {
  --width: v-bind(size);
  width: var(--width);
}
</style>
