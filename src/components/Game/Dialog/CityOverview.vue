<template>
  <q-dialog
    id="dialog-city-overview"
    ref="dialogRef"
    @hide="onDialogHide"
    :persistent="false"
  >
    <q-card class="swd-dialog" @mousedown="onMouseDown">
      <q-card-section>
        <Title> City cards </Title>
      </q-card-section>
      <EmptyStub v-if="!hasCards" />
      <q-card-section v-else>
        <div class="row no-wrap q-gutter-xs-xs q-gutter-md-md q-gutter-lg-lg">
          <template v-for="gid in groups" :key="gid">
            <div v-if="city.cards.data[gid]" class="column q-gutter-y-xs">
              <Card
                v-for="cid in city.cards.data[gid]"
                :key="cid"
                :id="cid"
                :dense="true"
              />
            </div>
          </template>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { useDraggble } from 'components/Game/Dialog/useDraggble';
import { useGameStore } from 'stores/game/game';
import { computed } from 'vue';
import { CardGroupId } from 'src/models/game';
import { Nickname } from 'src/models/account';
import EmptyStub from './EmptyStub.vue';
import Title from './Title.vue';
import Card from 'components/Game/Card/Card.vue';

interface Props {
  name: Nickname;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { name } = defineProps<Props>();

defineEmits([...useDialogPluginComponent.emits]);

const groups = [
  CardGroupId.rawMaterials,
  CardGroupId.manufacturedGoods,
  CardGroupId.military,
  CardGroupId.scientific,
  CardGroupId.commercial,
  CardGroupId.civilian,
  CardGroupId.guild,
];

const $game = useGameStore();
const city = computed(() => $game.city(name));

const hasCards = computed(() =>
  Object.values(city.value.cards.data).some((cards) => cards.length > 0)
);

const { onMouseDown } = useDraggble('#dialog-city-overview .swd-dialog');

const { dialogRef, onDialogHide } = useDialogPluginComponent();
</script>
