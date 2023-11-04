<template>
  <span class="cursor-pointer" @click="profile && onClick()">
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
  profile?: boolean;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { name, body, profile = true } = defineProps<Props>();

const $q = useQuasar();

const onClick = () => {
  $q.dialog({
    component: Profile,
    componentProps: {
      name,
    },
  });
};
</script>
