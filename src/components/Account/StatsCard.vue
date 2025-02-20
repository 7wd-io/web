<template>
  <q-card class="stats-card no-padding">
    <q-list dense>
      <q-item-label header class="text-weight-bolder text-h5">
        <slot name="title" />
      </q-item-label>

      <template v-for="k in order" :key="k">
        <q-separator />

        <q-item>
          <q-item-section class="text-capitalize">
            {{ k }}
          </q-item-section>
          <q-item-section side>
            <div class="text-weight-bolder">
              {{ getRate(data[k], k === 'total' ? total : data['total']) }}%
            </div>
            <div style="font-size: 12px; color: #999">
              {{ data[k] }}
            </div>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import { GameReport } from 'src/models/profile';

interface Props {
  data: GameReport;
  total: number;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { data, total } = defineProps<Props>();

type key = keyof GameReport;
const order: key[] = [
  'total',
  'points',
  'science',
  'military',
  'resign',
  'timeout',
];

const getRate = (value: number, t: number) => {
  if (!value || !t) {
    return 0;
  }

  return ((value * 100) / t).toFixed(2);
};
</script>

<style scoped>
.stats-card {
  width: 225px;
  padding: 24px;
  background-color: white;
}
</style>
