<template>
  <div
    class="rounded-borders relative-position swd-cover-dark q-pa-lg"
    style="width: 300px; height: 450px"
  >
    <h5 class="text-weight-bold text-center text-uppercase">Login</h5>

    <q-form novalidate @submit.stop="onSubmit">
      <q-input
        label="Nickname or Email *"
        v-model="login"
        type="text"
        color="primary"
        bg-color="white"
        lazy-rules="ondemand"
        :rules="rules.login"
        :clearable="true"
        outlined
      />
      <q-input
        label="Password *"
        v-model="password"
        color="primary"
        bg-color="white"
        :type="showPassword ? 'text' : 'password'"
        :rules="rules.password"
        lazy-rules="ondemand"
        :clearable="true"
        outlined
      >
        <template #append>
          <q-icon
            class="cursor-pointer"
            :name="showPassword ? 'visibility_off' : 'visibility'"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
      <q-btn type="submit" class="hidden"/>
    </q-form>

    <div class="form-footer">
      <div class="row justify-center">
        <div class="col col-auto">
          <q-btn
            style="width: 150px"
            label="Login"
            color="primary"
            :loading="inProgress"
            @click="onSubmit"
            push
          />
        </div>
      </div>
    </div>
  </div>
</template>

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

<style>
.form-footer {
  position: absolute;
  width: 300px;
  left: 0px;
  bottom: 25px;
}
</style>
