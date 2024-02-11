<script setup lang="ts">
import { useAccountStore } from 'stores/account';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { ApiError } from 'boot/axios';

const $q = useQuasar();
const $account = useAccountStore();

const inProgress = ref(false);
const login = ref('');
const password = ref('');
const showPassword = ref(false);
const rules = {
  login: [
    (val: string) => (val && val.length > 0) || 'Nickname or Email is required',
  ],
  password: [
    (val: string) => (val && val.length > 0) || 'Password is required',
  ],
};

const onSubmit = async () => {
  inProgress.value = true;

  try {
    await $account.signin(login.value, password.value);
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err,
      type: 'negative',
    });
  } finally {
    inProgress.value = false;
  }
};
</script>

<template>
  <q-card class="q-pa-lg absolute-center" style="width: 300px">
    <h5 class="text-weight-bold text-center">Log in</h5>

    <q-form :autofocus="true" novalidate @submit.stop="onSubmit">
      <q-input
        label="Nickname or Email *"
        v-model="login"
        type="text"
        color="welcome"
        lazy-rules="ondemand"
        :rules="rules.login"
        :clearable="true"
      />
      <q-input
        label="Password *"
        v-model="password"
        color="welcome"
        :type="showPassword ? 'text' : 'password'"
        :rules="rules.password"
        lazy-rules="ondemand"
        :clearable="true"
      >
        <template #append>
          <q-icon
            class="cursor-pointer"
            :name="showPassword ? 'visibility_off' : 'visibility'"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
      <q-card-actions align="center" class="q-pt-md">
        <q-btn
          label="Login"
          type="submit"
          color="welcome"
          :loading="inProgress"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>
