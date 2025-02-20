<template>
  <q-card class="card">
    <q-card-section horizontal>
      <div>
        {{ label }}
      </div>
    </q-card-section>
    <q-card-section horizontal>
      <div class="text-weight-bolder text-h5">
        {{ body }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  body: string | number;
}

const { label, body } = defineProps<Props>();
</script>

<style lang="scss" scoped>
.card {
  width: 225px;
  height: 135px;
  padding: 24px;
  background-color: white;
}
</style>
