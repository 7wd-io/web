<template>
  <q-dialog
    id="dialog-look-discard"
    ref="dialogRef"
    @hide="onDialogHide"
    :persistent="false"
  >
    <q-card class="swd-dialog" @mousedown="onMouseDown">
      <q-card-section>
        <Title> Discarded cards </Title>
      </q-card-section>
      <EmptyStub v-if="!cards?.length" />
      <q-card-section v-else>
        <div class="row q-gutter-md">
          <Card v-for="id in cards" :key="id" :id="id" />
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
import Title from './Title.vue';
import EmptyStub from './EmptyStub.vue';
import Card from 'components/Game/Unit/Building/BuildingUnit.vue';

defineEmits([...useDialogPluginComponent.emits]);
const {
  dialogRef,
  onDialogHide,
  // onDialogOK,
} = useDialogPluginComponent();

const $game = useGameStore();

const cards = computed(() => $game.state.cardItems.discarded);
const { onMouseDown } = useDraggble('#dialog-look-discard .swd-dialog');
</script>
