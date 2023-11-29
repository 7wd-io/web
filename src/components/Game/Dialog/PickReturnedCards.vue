<template>
  <q-dialog
    id="dialog-pick-returned-cards"
    :persistent="true"
    :model-value="show"
  >
    <q-card class="swd-dialog" @mousedown="onMouseDown">
      <q-card-section>
        <Title> Select returned cards </Title>
      </q-card-section>

      <q-card-section>
        <div class="column q-gutter-lg">
          <div class="row q-gutter-md">
            <div v-for="c in cards" :key="c">
              <div class="column items-center q-gutter-md">
                <div>
                  <swd-card :id="c" class="item cursor-pointer" />
                </div>

                <div>
                  <q-btn-toggle
                    :model-value="model[c]"
                    @update:model-value="onUpdate($event, c)"
                    size="calc(var(--swd-game-unit) * .8)"
                    toggle-color="primary"
                    color="white"
                    text-color="black"
                    :options="options"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="row justify-center">
            <Button :disabled="!picked" @click="onSubmit"> Apply</Button>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import Button from 'components/Game/Button.vue';
import { useGame } from 'stores/game/game';
import { useMoveStore } from 'stores/game/move';
import { computed, reactive } from 'vue';
import { CardId, Phase } from 'src/models/game';
import Title from './Title.vue';
import { useDraggble } from './useDraggble';

type choice = 'pick' | 'give' | '';

const { onMouseDown } = useDraggble('#dialog-pick-returned-cards .swd-dialog');
const $game = useGame();

const show = computed(
  () => $game.state.phase === Phase.pickReturnedCards && $game.isMyTurn
);

const cards = computed(() => $game.state.dialogItems.cards);
const model = reactive<Record<CardId, choice>>({});
const picks = reactive<Record<string, CardId>>({});
const picked = computed(() => picks.pick && picks.give);
const options = [
  {
    label: 'pick',
    value: 'pick',
  },
  {
    label: 'give',
    value: 'give',
  },
];

const onUpdate = (value: choice, card: CardId) => {
  (Object.keys(model) as unknown as CardId[]).forEach((k: CardId) => {
    if (model[k] === value) {
      model[k] = '';
    }
  });

  model[card] = value;
  picks[value] = card;
};

const onSubmit = () => {
  useMoveStore().pickReturnedCards($game.id, picks.pick, picks.give);
};
</script>
