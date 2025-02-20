<template>
  <Text size="sm" class="text-dark">
    {{ name }}
    <b :class="co" style="display: inline-block; width: 23px">{{ value }}</b>
  </Text>
</template>

<script setup lang="ts">
import { Nickname } from 'src/models/account';
import Text from 'components/Game/Text.vue';
import { computed } from 'vue';

interface Props {
  name: Nickname;
  value: '-' | 'Yes' | 'No';
}

const { name, value } = defineProps<Props>();

const co = computed(() => ({
  'text-positive': value === 'Yes',
  'text-negative': value === 'No',
}));

// const
</script>
