<template>
  <Badge v-if="show" pos="bottom" y="-30%">
    <Text size="xs">
      {{ answer }}
    </Text>
  </Badge>
</template>

<script setup lang="ts">
import Text from 'components/Game/Text.vue';
import Badge from 'components/Badge.vue';
import { Nickname } from 'src/models/account';
import { usePlayAgainStore } from 'stores/game/playAgain';
import { computed } from 'vue';

interface Props {
  name: Nickname;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { name } = defineProps<Props>();

const $playAgain = usePlayAgainStore();

const show = computed(() => $playAgain.showBadges);

const answer = computed(() => {
  if ($playAgain.answers[name] === undefined) {
    return '?';
  }

  return $playAgain.answers[name] ? 'Yes' : 'No';
});
</script>
