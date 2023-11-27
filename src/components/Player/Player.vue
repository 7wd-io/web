<template>
  <span class="cursor-pointer" @click="onClick()">
    {{ body || name }}
  </span>
</template>

<script setup lang="ts">
import { Nickname } from 'src/models/account';
import { useQuasar } from 'quasar';
import Profile from 'components/Account/Profile.vue';

interface Props {
  name: Nickname;
  body?: string;
}

const props = defineProps<Props>();

const $q = useQuasar();

const onClick = () => {
  $q.dialog({
    component: Profile,
    componentProps: {
      name: props.name,
    },
  });
};
</script>
