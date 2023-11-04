<template>
  <div class="provision">
    <div class="provision-box">
      <div class="raw-materials relative-position">
        <Resource
          v-for="id in rawMaterials"
          :key="id"
          :id="id"
          :count="city.resources[id] || 0"
          :price="city.bank.resourcePrice[id]"
        />

        <OneFromResourceBadge :name="name" pos="top" :group="rawMaterials" />
      </div>

      <div class="manufactured-goods relative-position">
        <Resource
          v-for="id in manufacturedGoods"
          :key="id"
          :id="id"
          :count="city.resources[id] || 0"
          :price="city.bank.resourcePrice[id]"
        />

        <OneFromResourceBadge
          :name="name"
          pos="bottom"
          :group="manufacturedGoods"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Resource from 'components/Game/City/Resource.vue';
import { rawMaterials, manufacturedGoods } from 'src/models/game';
import { Nickname } from 'src/models/account';
import { useGame } from 'src/stores/game/game';
import { computed } from 'vue';
import OneFromResourceBadge from 'components/Game/Badge/OneFromResource.vue';

interface Props {
  name: Nickname;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { name } = defineProps<Props>();

const $game = useGame();

const city = computed(() => $game.city(name));
</script>

<style lang="scss" scoped>
.raw-materials {
  margin-bottom: var(--swd-game-gap-sm);
}

.raw-materials,
.manufactured-goods {
  display: flex;
  flex-direction: row;
  justify-content: center;

  .resource {
    margin-left: var(--swd-game-gap-sm);
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
